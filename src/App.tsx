import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HMap from "./components/HMap";
// import ProductViewer from "./components/ProductViewer";
import Team from "./components/Team";
import { Biotex } from "./components/Team/Biotex";
import Updates from "./components/Updates";

function App() {
  return (
    <div className="App">
      <Hero />
      {/*<ProductViewer />*/}
      <Updates />
      <Team />
      <Biotex />
      <HMap />
      <Footer />
    </div>
  );
}

export default App;
