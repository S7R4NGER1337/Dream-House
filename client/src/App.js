import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Nav />
      <div style={{marginTop: '5rem'}}>
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
