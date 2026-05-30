import Footer from './components/Footer'
import Hero from './components/Hero'
import HMap from './components/HMap'
// import ProductViewer from "./components/ProductViewer";
import NameStory from './components/NameStory'
import Team from './components/Team'
import { Biotex } from './components/Team/Biotex'
import Updates from './components/Updates'

function App() {
  return (
    <div className="App">
      <main>
        <Hero />
        {/*<ProductViewer />*/}
        <NameStory />
        <Updates />
        <Team />
        <Biotex />
        <HMap />
      </main>
      <Footer />
    </div>
  )
}

export default App
