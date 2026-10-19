import mapDesktop1x from './map-desktop@1x.webp'
import mapDesktop2x from './map-desktop@2x.webp'
import mapMobile2x from './map-mobile@2x.webp'
import mapMobile3x from './map-mobile@3x.webp'
import mapboxLogo from './mapbox-logo.svg'

// Static render of our Mapbox style (regenerate with `node scripts/render-map.mjs`).
// Mapbox's terms require the wordmark + text attribution on static maps, so they're overlaid here.
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
    <a
      href="https://www.mapbox.com/about/maps/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-2 left-2"
    >
      <img src={mapboxLogo} alt="Mapbox" width={88} height={23} />
    </a>
    <div className="absolute bottom-0 right-0 bg-white/70 px-1.5 py-0.5 text-[11px] text-gray-700">
      <a
        href="https://www.mapbox.com/about/maps/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        &copy; Mapbox
      </a>{' '}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        &copy; OpenStreetMap
      </a>{' '}
      <a
        href="https://apps.mapbox.com/feedback/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold hover:underline"
      >
        Improve this map
      </a>
    </div>
  </div>
)
