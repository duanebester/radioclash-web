// Renders the Mapbox style to static high-DPI WebP images for the HMap component.
// Requires: .env with VITE_USERNAME / VITE_STYLE_ID / VITE_ACCESS_TOKEN, `chromium`, and ImageMagick (`convert`).
// Usage: node scripts/render-map.mjs
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const outDir = path.join(root, 'src', 'components', 'HMap')
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-map-'))
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, '.env'), 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => {
      const i = l.indexOf('=')
      return [
        l.slice(0, i).trim(),
        l
          .slice(i + 1)
          .trim()
          .replace(/^['"]|['"]$/g, ''),
      ]
    }),
)

const CENTER = [-95.3492902, 29.7609828]
// Leaflet zoom 13 with 256px tiles == GL zoom 12 (512px tiles)
const ZOOM = 12

const html = `<!doctype html><html><head><meta charset=utf-8>
<link href="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css" rel=stylesheet>
<script src="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js"></script>
<style>html,body,#m{margin:0;width:100vw;height:100vh;overflow:hidden}</style></head>
<body><div id=m></div><script>
mapboxgl.accessToken=${JSON.stringify(env.VITE_ACCESS_TOKEN)};
window.mapReady=false;
const map=new mapboxgl.Map({container:'m',style:'mapbox://styles/${env.VITE_USERNAME}/${env.VITE_STYLE_ID}',
  center:${JSON.stringify(CENTER)},zoom:${ZOOM},interactive:false,attributionControl:false,
  logoPosition:'bottom-left',fadeDuration:0,preserveDrawingBuffer:true});
map.on('error',e=>console.error('MAPERR',e.error&&e.error.message));
map.on('idle',()=>{if(map.areTilesLoaded()&&map.loaded()) window.mapReady=true});
</script></body></html>`

// Serve over http://localhost (token URL restrictions usually allow localhost; file:// is flaky)
const server = http.createServer((_, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  res.end(html)
})
await new Promise(r => server.listen(4399, '127.0.0.1', r))

const chrome = spawn(
  'chromium',
  [
    '--headless',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    '--remote-debugging-port=9333',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const sleep = ms => new Promise(r => setTimeout(r, ms))
let wsUrl
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200)
  try {
    const list = await (await fetch('http://127.0.0.1:9333/json')).json()
    wsUrl = list.find(t => t.type === 'page')?.webSocketDebuggerUrl
  } catch {}
}
if (!wsUrl) throw new Error('could not connect to chromium')

const ws = new WebSocket(wsUrl)
await new Promise(r => ws.addEventListener('open', r))
let id = 0
const pending = new Map()
ws.addEventListener('message', ev => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  } else if (msg.method === 'Runtime.consoleAPICalled') {
    console.log('[page]', msg.params.args.map(a => a.value).join(' '))
  }
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const myId = ++id
    pending.set(myId, msg => (msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)))
    ws.send(JSON.stringify({ id: myId, method, params }))
  })

await send('Runtime.enable')
await send('Page.enable')

// Container is full-width x h-72 (288px). Rendered at the max density each target needs,
// then downscaled for lower-density screens.
// [name, css width, css height, max device scale factor, densities to emit]
const shots = [
  ['map-mobile', 768, 288, 3, [2, 3]],
  ['map-desktop', 2560, 288, 2, [1, 2]],
]

// Render with a margin on every side, then crop back to the center. This strips the
// baked-in Mapbox logo; HMap.tsx overlays the logo + attribution as real HTML instead.
const PAD = 120

for (const [name, width, height, dpr, densities] of shots) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: width + PAD * 2,
    height: height + PAD * 2,
    deviceScaleFactor: dpr,
    mobile: false,
  })
  await send('Page.navigate', { url: 'http://127.0.0.1:4399/' })
  let ready = false
  for (let i = 0; i < 300 && !ready; i++) {
    await sleep(200)
    const r = await send('Runtime.evaluate', { expression: 'window.mapReady === true', returnByValue: true })
    ready = r.result.value
  }
  if (!ready) throw new Error(`${name}: map never became idle`)
  await sleep(500)
  const { data } = await send('Page.captureScreenshot', { format: 'png' })
  const png = path.join(tmpDir, `${name}.png`)
  fs.writeFileSync(png, Buffer.from(data, 'base64'))

  for (const d of densities) {
    const out = path.join(outDir, `${name}@${d}x.webp`)
    const r = spawnSync(
      'convert',
      [
        png,
        '-crop',
        `${width * dpr}x${height * dpr}+${PAD * dpr}+${PAD * dpr}`,
        '+repage',
        '-filter',
        'Lanczos',
        '-resize',
        `${width * d}x${height * d}!`,
        '-quality',
        '82',
        out,
      ],
      { stdio: 'inherit' },
    )
    if (r.status !== 0) throw new Error(`convert failed for ${out}`)
    console.log('wrote', path.relative(root, out), `${width * d}x${height * d}`)
  }
}

ws.close()
chrome.kill()
server.close()
fs.rmSync(tmpDir, { recursive: true, force: true })
