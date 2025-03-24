import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env

export const HMap = () => {
  return (
    <div className="relative bg-blue-900 overflow-hidden h-72">
      <MapContainer
        center={[29.7609828, -95.3492902]}
        style={{ minHeight: '100%', minWidth: '100%' }}
        zoom={14}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${VITE_USERNAME}/${VITE_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_ACCESS_TOKEN}`}
        />
      </MapContainer>
    </div>
  )
}
