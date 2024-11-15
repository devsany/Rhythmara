import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Music from "./components/Music";
import UploadSong from "./components/uploadSong/UploadSong";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <UploadSong /> */}
      <Music />
    </>
  );
}

export default App;
