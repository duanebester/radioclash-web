import React from 'react'

import logoFull from '../../logo-full.png'

export const Footer = () => {
  return (
    <div id="contact" className="relative bg-purple-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto h-auto">
        <div className="grid grid-cols-3 gap-4 py-20">
          <div className="grid grid-flow-row auto-rows-max mx-auto">
            <img src={logoFull} width='250px' />
          </div>
          <div className="grid grid-flow-row auto-rows-max mx-auto">
            <h4>Headquarters</h4>
            <span className="font-thin">5813 Fulton St</span>
            <span className="font-thin">Houston, TX 77009</span>
          </div>
          <div className="grid grid-flow-row auto-rows-max mx-auto">
            <h4>Email</h4>
            <a href="mailto:info@radioclash.co" className="font-thin">
              info@radioclash.co
            </a>
          </div>
        </div>
        <div className="w-max mx-auto py-4">
          <span className="font-thin">&copy; 2024 RadioClash, Inc.</span>
        </div>
        
      </div>
      
    </div>
  )
}
