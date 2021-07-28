import React from 'react'
import Hero from './components/Hero'
import HMap from './components/HMap'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Hero />
      <div className="relative bg-purple-900 overflow-hidden h-72">
        <HMap />
      </div>
      <Footer/>
    </div>
  )
}

export default App
