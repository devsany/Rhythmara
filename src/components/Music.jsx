import React, { useState, useRef, useEffect } from "react";
import app from "../firebase/firebaseConfig";
import {
  getDatabase,
  get,
  ref,
  push,
  set,
  update,
  increment,
} from "firebase/database";
import SideLeftNav from "./Navbar/SideLeftNav";
import { NavLink } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [song, setSong] = useState([]);
  const [audio, setAudio] = useState("");
  const audioRef = useRef(null);
  const [likeState, setLikeState] = useState({});

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
      const data = snapshot.val();
      const formattedData = Object.entries(data).map(([id, value]) => ({
        id, // unique ID
        ...value, // spread the rest of the data
      }));
      setSong(formattedData);
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
  const handleLike = async (id) => {
    const db = getDatabase(app);
    const trackRef = ref(db, `track/${id}`);
    try {
      // Increment the like count in Firebase
      await update(trackRef, {
        like: increment(1),
      });
      console.log("Liked the song successfully!");
      setLikeState((prevState) => ({
        ...prevState,
        [id]: true, // Set like for the specific object
      }));
      console.log(`Liked song with ID: ${id}`);
      // Show dislike button
      fetchArtist(); // Refresh song list to update UI
    } catch (error) {
      console.error("Error liking the song:", error);
    }
  };

  const handleDislike = async (id) => {
    const db = getDatabase(app);
    const trackRef = ref(db, `track/${id}`);
    try {
      // Decrement the like count in Firebase
      await update(trackRef, {
        like: increment(-1),
      });
      console.log("Disliked the song successfully!");
      setLikeState((prevState) => ({
        ...prevState,
        [id]: false, // Set dislike for the specific object
      }));
      console.log(`Disliked song with ID: ${id}`);
      // Show like button
      fetchArtist(); // Refresh song list to update UI
    } catch (error) {
      console.error("Error disliking the song:", error);
    }
  };
  console.log(song);
  useEffect(() => {
    fetchArtist();
  }, [audio, currentTrack]);
  return (
    <div className="music-player dark:bg-slate-600">
      <div className="md:grid md:grid-cols-12  ">
        <div className="md:col-span-3  ">
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
          {song &&
            song.map((item, index) => {
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

                      <div className="text-center flex gap-8">
                        <div>
                          <button
                            onClick={() =>
                              likeState[item.id]
                                ? handleDislike(item.id)
                                : handleLike(item.id)
                            }
                          >
                            {likeState[item.id] ? (
                              <>
                                <svg
                                  class="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                </svg>
                              </>
                            ) : (
                              <>
                                <svg
                                  class="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                  />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                        <div>{item.like || "0"}</div>
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

export default Music;
