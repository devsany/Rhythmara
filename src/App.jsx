import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Music from "./components/Music";
import UploadSong from "./components/uploadSong/UploadSong";
import Demo from "./components/Demo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <UploadSong /> */}
      hii
      <div className="ml-3">
        <audio controls>
          <source
            src="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            // src="https://raw.githubusercontent.com/devsany/mp3-files-hosting/main/Second%20Hand%20Jawaani%20(Full%20Video%20Song)%20Cocktail%20Saif%20Ali%20Khan,%20Deepika%20Padukone%20Pritam.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      {/* <Demo /> */}
      <Music />
    </>
  );
}

export default App;
