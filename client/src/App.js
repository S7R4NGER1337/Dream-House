import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Nav />
      <div style={{marginTop: '5rem'}}>
        <Home />
      </div>
    </>
  );
}

export default App;
