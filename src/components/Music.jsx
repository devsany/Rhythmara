import React, { useState, useRef, useEffect } from "react";
import app from "../firebase/firebaseConfig";
import { getDatabase, get, ref, push, set, update } from "firebase/database";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);
  const [song, setSong] = useState([]);

  const tracks = [
    {
      title: "Track 1",
      artist: "Artist 1",
      url: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3", // replace with your track URL
    },
    {
      title: "Track 2",
      artist: "Artist 2",
      url: "/path/to/track2.mp3", // replace with your track URL
    },
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    setIsPlaying(false);
  };

  const handlePrevTrack = () => {
    setCurrentTrack(
      (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length
    );
    setIsPlaying(false);
  };
  const fetchArtist = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `track`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries = Object.values(snapshot.val());
      setSong(entries);
      // const entries1 = Object.entries(snapshot.val());

      //   Find the entry where name is "token as id"
      //   const foundEntry = entries.find(([key, value]) => value.token === id);
      //   if (foundEntry) {
      //     const [key, userData] = foundEntry;
      //     setArtiseKey(key); // Output: user1 (or whatever the key is)
    } else {
      console.log("Data is not found");
    }
  };
  console.log(song);
  useEffect(() => {
    fetchArtist();
  }, []);
  return (
    <div className="music-player">
      <div className="flex">
        {song &&
          song.map((item, index) => {
            return (
              <>
                <div className="">
                  <div>{item.title}</div>
                  <div>{item.audioFile} </div>
                </div>
              </>
            );
          })}
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onEnded={handleNextTrack}
      ></audio>
      <h3>{tracks[currentTrack].title}</h3>
      <p>{tracks[currentTrack].artist}</p>
      <button onClick={handlePrevTrack}>Previous</button>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleNextTrack}>Next</button>
    </div>
  );
};

export default Music;
