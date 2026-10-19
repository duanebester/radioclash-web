// Renders static high-DPI WebP map images for the HMap component.
// Uses MapLibre GL + OpenFreeMap (OpenStreetMap data, no API key), with the Positron style
// recolored to the site's blue palette.
// Requires: `chromium` and ImageMagick (`convert`).
// Usage: node scripts/render-map.mjs
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const outDir = path.join(root, 'src', 'components', 'HMap')
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-map-'))
const CENTER = [-95.3492902, 29.7609828]
const ZOOM = 12
const MAPLIBRE = 'https://unpkg.com/maplibre-gl@5.24.0/dist'

const C = {
  land: 'hsl(216, 30%, 99%)',
  park: 'hsla(218, 48%, 82%, 0.26)',
  water: 'hsl(221, 69%, 77%)',
  building: 'hsl(216, 29%, 95%)',
  buildingOutline: 'hsl(216, 26%, 89%)',
  roadMinor: 'hsla(218, 73%, 81%, 0.3)',
  roadMajor: 'hsla(218, 73%, 81%, 0.4)',
  waterLabel: 'hsl(221, 37%, 92%)',
  rail: 'hsl(216, 26%, 89%)',
  boundary: 'hsl(216, 24%, 72%)',
  label: 'hsl(216, 31%, 50%)',
  labelLight: 'hsl(216, 31%, 68%)',
  halo: 'hsl(216, 29%, 100%)',
}

// Scale a line-width that is a number or an ["interpolate", curve, ["zoom"], z0, v0, z1, v1, ...] expression.
const thinner = (w, k) => {
  if (typeof w === 'number') return w * k
  if (Array.isArray(w) && w[0] === 'interpolate') {
    return w.map((v, i) => (i >= 3 && (i - 3) % 2 === 1 && typeof v === 'number' ? v * k : v))
  }
  return w
}

// Map each Positron layer to the palette. Anything not listed keeps Positron's defaults.
const recolor = layer => {
  const { id } = layer
  layer.paint ??= {}
  layer.layout ??= {}
  const { paint, layout } = layer
  const hide = () => {
    layout.visibility = 'none'
  }
  const text = (color, halo = C.halo) => {
    paint['text-color'] = color
    paint['text-halo-color'] = halo
  }

  if (id.includes('shield')) hide()
  else if (id === 'background') paint['background-color'] = C.land
  else if (id === 'park' || id === 'landcover_wood') paint['fill-color'] = C.park
  else if (id === 'landuse_residential' || id.startsWith('landcover_')) paint['fill-color'] = C.land
  else if (id === 'water') paint['fill-color'] = C.water
  else if (id === 'waterway') paint['line-color'] = C.water
  else if (id === 'building') {
    paint['fill-color'] = C.building
    paint['fill-outline-color'] = C.buildingOutline
  } else if (id.startsWith('aeroway')) paint[layer.type === 'fill' ? 'fill-color' : 'line-color'] = C.building
  else if (id.startsWith('road_') && layer.type === 'fill') paint['fill-color'] = C.land
  else if (id.startsWith('road_')) paint['line-color'] = C.land
  else if (id.endsWith('_casing') || id.endsWith('_dashline')) hide()
  else if (id === 'highway_path' || id === 'highway_minor') {
    paint['line-color'] = C.roadMinor
    paint['line-width'] = thinner(paint['line-width'], 0.6)
  } else if (id.startsWith('highway_') || id.startsWith('tunnel_')) {
    paint['line-color'] = C.roadMajor
    paint['line-width'] = thinner(paint['line-width'], 0.7)
  }
  else if (id.startsWith('railway')) paint['line-color'] = C.rail
  else if (id.startsWith('boundary')) paint['line-color'] = C.boundary
  else if (id.startsWith('highway-name')) text(C.labelLight)
  else if (id.startsWith('water')) text(C.waterLabel, 'rgba(0,0,0,0)')
  else if (id === 'label_other') {
    text(C.labelLight)
    layout['text-font'] = ['Noto Sans Regular']
    layout['text-transform'] = 'uppercase'
    layout['text-letter-spacing'] = 0.12
  } else if (layer.type === 'symbol') text(C.label)
  return layer
}

const style = await (await fetch('https://tiles.openfreemap.org/styles/positron')).json()
style.layers = style.layers.map(recolor)

const html = `<!doctype html><html><head><meta charset=utf-8>
<link href="${MAPLIBRE}/maplibre-gl.css" rel=stylesheet>
<script src="${MAPLIBRE}/maplibre-gl.js"></script>
<style>html,body,#m{margin:0;width:100vw;height:100vh;overflow:hidden}</style></head>
<body><div id=m></div><script>
window.mapReady=false;
const map=new maplibregl.Map({container:'m',style:${JSON.stringify(style)},
  center:${JSON.stringify(CENTER)},zoom:${ZOOM},interactive:false,attributionControl:false,
  fadeDuration:0,canvasContextAttributes:{preserveDrawingBuffer:true}});
map.on('error',e=>console.error('MAPERR',e.error&&e.error.message));
map.on('idle',()=>{if(map.areTilesLoaded()&&map.loaded()) window.mapReady=true});
</script></body></html>`

// Serve over http://localhost (WebGL + fetch are flaky from file://)
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
process.on('exit', () => chrome.kill())

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

// Render with a margin on every side, then crop back to the center so labels near the
// edges are placed as if the map continued (no clipped/missing labels at the borders).
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
