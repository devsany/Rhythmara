import React, { useState, useRef, useEffect } from "react";
import app from "../firebase/firebaseConfig";
import { getDatabase, get, ref, push, set, update } from "firebase/database";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [song, setSong] = useState([]);
  const [audio, setAudio] = useState("");
  const audioRef = useRef(null);
  const [like, setLike] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % song.length);
    setIsPlaying(false);
    setAudio("");
  };

  const handlePrevTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack - 1 + song.length) % song.length);
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
  const fetchTrackArtist = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `artist`);
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
  const handleAddSong = (id) => {
    setAudio(id);
    setIsPlaying(false);
  };
  const audio1 = new Audio(audio ? audio : song[currentTrack]?.audioFile);
  audio1.onloadedmetadata = () => {
    console.log(audio1.duration); // Set the duration when metadata is loaded
  };
  const handleLikes = () => {
    setLike(true);
  };
  const handleDislikes = () => {
    setLike(false);
  };
  console.log(song);
  useEffect(() => {
    fetchArtist();
  }, [audio, currentTrack]);
  return (
    <div className="music-player">
      <div className="grid grid-cols-12">
        <div className="col-span-3">dashboard</div>
        <div className="col-span-9">
          {song &&
            song.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="border cursor-pointer shadow-sm rounded-lg font-semibold text-slate-500 bg-slate-200 m-3 p-4"
                    onClick={() => {
                      handleAddSong(item.audioFile);
                    }}
                  >
                    <div className="grid grid-cols-4 text-centre items-center">
                      <div className="w-16 h-16">
                        <img
                          className="w-full h-full object-cover rounded-md shadow-md"
                          src={item.coverImage}
                          alt={item.title}
                        />
                      </div>
                      <div> {item.title}</div>
                      <div>
                        Genere -{" "}
                        {item.genre ? (
                          <>{item.genre}</>
                        ) : (
                          <>No Genre available</>
                        )}{" "}
                      </div>
                      <div className="text-center">
                        {like ? (
                          <div className="w-8 h-8">
                            <img
                              onClick={handleDislikes}
                              src="/likes_button/heart-svgrepo-com.png"
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8">
                            <img
                              onClick={handleLikes}
                              src="/likes_button/heart-svgrepo-com (1).png"
                              alt=""
                            />
                          </div>
                        )}
                        {item.like}
                      </div>
                    </div>
                    {/* <div onClick={togglePlayPause}>{item.audioFile} </div> */}
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <audio
        ref={audioRef}
        // src={song[currentTrack]?.audioFile}
        src={audio ? audio : song[currentTrack]?.audioFile}
        onEnded={handleNextTrack}
      ></audio>

      <div>
        <div className="fixed bottom-0 left-0 w-full bg-slate-200 rounded-t-lg shadow-inner    text-center p-4">
          <div>{/* <h3>{song[currentTrack]?.title}</h3> */}</div>
          <div className="grid grid-cols-11">
            <div className="col-span-4"></div>
            <div className="  bg-blue-200 flex rounded-lg items-center text-center justify-center">
              {" "}
              <button onClick={handlePrevTrack}>
                <p className="tracking-tighter font-semibold text-gray-500 md:text-lg dark:text-gray-400">
                  Previous
                </p>
              </button>
            </div>

            <div>
              <button onClick={togglePlayPause}>
                {isPlaying ? (
                  <>
                    <div className="flex items-center justify-center">
                      <img
                        className="w-12"
                        src="/song_button/pause-circle-svgrepo-com.png"
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center  ">
                      <img
                        className="w-12"
                        src="/song_button/play-circle-svgrepo-com.png"
                        alt=""
                      />
                    </div>
                  </>
                )}
              </button>
            </div>
            <div>
              {" "}
              <div className="  bg-blue-200 flex rounded-lg items-center text-center justify-center">
                <button onClick={handleNextTrack}>
                  <p className="tracking-tighter pt-3 pb-3 font-semibold text-gray-500 md:text-lg dark:text-gray-400">
                    Next
                  </p>
                </button>
              </div>
            </div>
            <div className="col-span-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
