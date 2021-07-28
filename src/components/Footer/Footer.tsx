import React from 'react'

export const Footer = () => {
  return (
    <div id="contact" className="relative bg-purple-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto h-auto">
        <div className="grid grid-cols-3 gap-4 py-20">
          <div className="font-thin">&copy; 2021 RadioClash, Ltd, Co.</div>
          <div className="grid grid-flow-row auto-rows-max">
            <h4>Headquarters</h4>
            <span className="font-thin">Runnels St</span>
            <span className="font-thin">Houston, TX 77003</span>
          </div>
          <div className="grid grid-flow-row auto-rows-max">
            <h4>Email</h4>
            <a href="mailto:info@radioclash.co" className="font-thin">info@radioclash.co</a>
          </div>
        </div>
      </div>
    </div>
  )
}
