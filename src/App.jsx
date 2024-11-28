import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Music from "./components/Music";
import UploadSong from "./components/uploadSong/UploadSong";
import Demo from "./components/Demo";
import {
  BrowserRouter,
  NavLink,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import NewRelease from "./components/SideNav/NewRelease";
import TopPlaylist from "./components/SideNav/TopPlaylist";
import TopCharts from "./components/SideNav/TopCharts";
import Podcast from "./components/SideNav/Podcast";
import RadioStation from "./components/SideNav/RadioStation";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <SideLeftNav /> */}
        <Routes>
          <Route path="/" element={<Music />} />
          <Route path="/release" element={<NewRelease />} />
          <Route path="/top_playlist" element={<TopPlaylist />} />
          <Route path="/top_charts" element={<TopCharts />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/radio_station" element={<RadioStation />} />
        </Routes>
      </BrowserRouter>
      {/* <Music /> */}
    </>
  );
}

export default App;
