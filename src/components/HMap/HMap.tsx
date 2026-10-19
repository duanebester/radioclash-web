import mapDesktop1x from './map-desktop@1x.webp'
import mapDesktop2x from './map-desktop@2x.webp'
import mapMobile2x from './map-mobile@2x.webp'
import mapMobile3x from './map-mobile@3x.webp'

const attribution = [
  { href: 'https://openfreemap.org', label: 'OpenFreeMap' },
  { href: 'https://www.openmaptiles.org/', label: '© OpenMapTiles' },
  { href: 'https://www.openstreetmap.org/copyright', label: '© OpenStreetMap contributors' },
]

// Static render of OpenStreetMap data via OpenFreeMap (regenerate with `node scripts/render-map.mjs`).
// OSM's ODbL license requires visible attribution.
export const HMap = () => (
  <div className="relative bg-blue-50 overflow-hidden h-72">
    <picture>
      <source media="(max-width: 767px)" srcSet={`${mapMobile2x} 2x, ${mapMobile3x} 3x`} />
      <img
        src={mapDesktop1x}
        srcSet={`${mapDesktop1x} 1x, ${mapDesktop2x} 2x`}
        alt="Map of downtown Houston, Texas"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
    <div className="absolute bottom-0 right-0 bg-white/70 px-1.5 py-0.5 text-[11px] text-gray-700">
      {attribution.map(({ href, label }, i) => (
        <span key={href}>
          {i > 0 && ' '}
          <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {label}
          </a>
        </span>
      ))}
    </div>
  </div>
)
