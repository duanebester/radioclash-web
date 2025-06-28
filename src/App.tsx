import React from 'react'
import Hero from './components/Hero'
import Team from './components/Team'
import { Biotex } from './components/Team/Biotex'
import Updates from './components/Updates'
import HMap from './components/HMap'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Hero />
      <Updates />
      <Team />
      <Biotex />
      <HMap />
      <Footer />
    </div>
  )
}

export default App
