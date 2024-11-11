import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Music from "./components/Music";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Music />
    </>
  );
}

export default App;
