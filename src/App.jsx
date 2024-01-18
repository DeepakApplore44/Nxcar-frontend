import { useState } from "react";
import reactLogo from "./assets/react.svg";
import nxcarLogo from "./assets/nxcarLogo.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/SpinSection/SpinSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
