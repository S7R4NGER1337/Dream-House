import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";

function App() {
  return (
    <>
      <Nav />
      <div style={{ marginTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
