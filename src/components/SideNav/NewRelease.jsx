import React, { useState, useRef, useEffect } from "react";
import { getDatabase, get, ref, push, set, update } from "firebase/database";
import app from "../../firebase/firebaseConfig";
import SideLeftNav from "../Navbar/SideLeftNav";
import { NavLink } from "react-router-dom";

const NewRelease = () => {
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
  const newRlease = song.filter((item) => {
    return item.category === "newReleases";
  });
  console.log(newRlease);
  console.log(song);
  useEffect(() => {
    fetchArtist();
  }, [audio, currentTrack]);
  return (
    <div className="music-player dark:bg-slate-600">
      <div className="grid grid-cols-12  ">
        <div className="col-span-3">
          <div className="fixed left-0  ">
            <SideLeftNav />
          </div>
        </div>
        <div className="md:col-span-9  mb-20   md:ml-0 ml-10 ">
          <div className=" md:flex hidden justify-between ">
            <div className="flex gap-6 text-sm m-6 font-thin text-slate-600">
              <div>
                <NavLink
                  className="hover:bg-blue-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                  to={"/"}
                >
                  Tracks
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/release"}
                  className="hover:bg-yellow-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                >
                  New Release
                </NavLink>
              </div>
              <div>
                {" "}
                <NavLink
                  to={"/top_playlist"}
                  className="hover:bg-cyan-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                >
                  Top Playlist
                </NavLink>
              </div>
              <div>
                {" "}
                <NavLink
                  to={"/top_charts"}
                  className="hover:bg-orange-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                >
                  Top Charts
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/podcast"}
                  className="hover:bg-green-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                >
                  Podcast
                </NavLink>
              </div>
              <div>
                {" "}
                <NavLink
                  to={"/radio_station"}
                  className="hover:bg-pink-100 hover:shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md"
                >
                  Radio Station
                </NavLink>
              </div>
            </div>
            <div className="m-6"> hii</div>
          </div>
          <div className="mb-3 md:block hidden">
            {" "}
            <hr />
          </div>
          {newRlease &&
            newRlease.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="  cursor-pointer   rounded-l-full font-semibold   text-slate-500 bg-slate-50  ml-3 mb-3 p-2"
                    onClick={() => {
                      handleAddSong(item.audioFile);
                    }}
                  >
                    <div className="grid grid-cols-4 text-centre items-center">
                      <div className="w-16 h-16">
                        <img
                          className="w-full h-full object-cover rounded-full shadow-md"
                          src={item.coverImage}
                          alt={item.title}
                        />
                      </div>
                      <div className="md:text-md text-sm"> {item.title}</div>
                      <div>
                        {" "}
                        {item.genre ? (
                          <div className="md:text-md text-sm">{item.genre}</div>
                        ) : (
                          <>No Genre available</>
                        )}{" "}
                      </div>
                      <div className="text-center">
                        {like ? (
                          <div className="w-6 h-6">
                            <img
                              onClick={handleDislikes}
                              src="/likes_button/heart-svgrepo-com.png"
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6">
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
                    {/* <div onClick ={togglePlayPause}>{item.audioFile} </div> */}
                  </div>
                </>
              );
            })}
        </div>
        <div className="col-span-9  mb-20    ">
          {newRlease &&
            newRlease.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="  cursor-pointer   rounded-l-full font-semibold   text-slate-500 bg-slate-50  ml-3 mb-3 p-2"
                    onClick={() => {
                      handleAddSong(item.audioFile);
                    }}
                  >
                    <div className="grid grid-cols-4 text-centre items-center">
                      <div className="w-16 h-16">
                        <img
                          className="w-full h-full object-cover rounded-full shadow-md"
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
                          <div className="w-6 h-6">
                            <img
                              onClick={handleDislikes}
                              src="/likes_button/heart-svgrepo-com.png"
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6">
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
                    {/* <div onClick ={togglePlayPause}>{item.audioFile} </div> */}
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
        <div className="fixed bottom-0 left-0 w-full bg-slate-100 rounded-t-lg shadow-inner    text-center p-1">
          <div>{/* <h3>{song[currentTrack]?.title}</h3> */}</div>
          <div className="grid grid-cols-11">
            <div className="col-span-4"></div>
            <div className="    flex rounded-lg items-center text-center justify-center">
              {" "}
              <button onClick={handlePrevTrack}>
                <p className="tracking-tighter font-semibold text-gray-700 md:text-lg dark:text-gray-700">
                  Previous
                </p>
              </button>
            </div>

            <div>
              <button onClick={togglePlayPause}>
                {isPlaying ? (
                  <>
                    <div className="flex mt-2 items-center justify-center">
                      <img
                        className="w-12"
                        src="/song_button/pause-circle-svgrepo-com.png"
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex mt-2 items-center justify-center  ">
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
              <div className="flex rounded-lg items-center text-center justify-center">
                <button onClick={handleNextTrack}>
                  <p className="tracking-tighter pt-4 pb-4 font-semibold text-gray-700 md:text-lg dark:text-gray-700">
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

export default NewRelease;
