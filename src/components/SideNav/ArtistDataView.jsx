import React, { useState, useRef, useEffect } from "react";
import { getDatabase, get, ref, push, set, update } from "firebase/database";
import app from "../../firebase/firebaseConfig";
import SideLeftNav from "../Navbar/SideLeftNav";
import { NavLink, useParams } from "react-router-dom";

const ArtistDataView = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [song, setSong] = useState([]);
  const [audio, setAudio] = useState("");
  const audioRef = useRef(null);
  const [like, setLike] = useState(false);
  const [album, setAlbum] = useState([]);
  const [tarck, setTrack] = useState([]);

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
    const dataRef = ref(db, `artists/${id}`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries = Object.values(snapshot.val());
      setSong(entries);
      const dataArray1 = Object.entries(entries[0]).map(([id, details]) => ({
        id, // Unique ID
        ...details, // Spread the nested data
      }));
      const songTrack = Object.entries(entries[5]).map(([id, details]) => ({
        id, // Unique ID
        ...details, // Spread the nested data
      }));
      setAlbum(dataArray1);
      setTrack(songTrack);
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
  //   const fetchTrackArtist = async () => {
  //     const db = getDatabase(app);
  //     const dataRef = ref(db, `artist/${id}`);
  //     const snapshot = await get(dataRef);
  //     if (snapshot.exists()) {
  //       const entries = Object.values(snapshot.val());
  //       const entries1 = Object.values(snapshot.val());
  //       setSong(entries);

  //       //   const dataArray1 = Object.entries(entries[0]).map(([id, details]) => ({
  //       //     id, // Unique ID
  //       //     ...details, // Spread the nested data
  //       //   }));
  //       setData(entries1);

  //       // const entries1 = Object.entries(snapshot.val());

  //       //   Find the entry where name is "token as id"
  //       //   const foundEntry = entries.find(([key, value]) => value.token === id);
  //       //   if (foundEntry) {
  //       //     const [key, userData] = foundEntry;
  //       //     setArtiseKey(key); // Output: user1 (or whatever the key is)
  //     } else {
  //       console.log("Data is not found");
  //     }
  //   };
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
    return item.category === "podcasts";
  });

  //data to retrive the value

  //   //check the data and getting the value
  //   const fetchData = async () => {
  //     const db = getDatabase();
  //     const usersRef = ref(db, "artists");

  //     try {
  //       const snapshot = await get(usersRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         const formattedData = Object.entries(data).map(([id, value]) => ({
  //           id, // unique ID
  //           ...value, // spread the rest of the data
  //         }));
  //         setSong(formattedData); // [{id: "user1", name: "Alice", age: 25}, ...]
  //       } else {
  //         console.log("No data available");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  console.log(song);

  //   const dataArray2 = Object.entries(song[0]).map(([id, details]) => ({
  //     id,
  //     ...details,
  //   }));
  console.log(album);
  console.log(tarck);
  useEffect(() => {
    fetchArtist();
    // fetchData();
  }, [audio, currentTrack]);
  return (
    <div className="music-player dark:bg-slate-600">
      <div className="md:grid md:grid-cols-12  ">
        <div className="md:col-span-3">
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
          </div>
          <div className="mb-3 md:block hidden">
            {" "}
            <hr />
          </div>

          <div className="pt-[50px]">
            <div className="flex">
              <div className="bg-slate-500 w-5 mt-[10px]  h-5 rounded-full"></div>
              <div className="ml-2 text-3xl font-semibold text-slate-500">
                {song[3]}
              </div>
            </div>
            <div className="border-l-2 pl-3 ml-2">
              <div>
                <div className="bg-gradient-to-r w-[190px] from-blue-300 via-purple-300 to-pink-400 p-2 rounded-full">
                  <img
                    src={song[4]}
                    className="rounded-full w-[180px]    h-[180px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="pl-2 pr-2 bg-blue-100 w-[90px] rounded-md font-semibold text-slate-600 text-sm font-sans mt-3 shadow-md ">
                <h1>{song[2]}</h1>
              </div>
              <div className="font-semibold text-slate-600">
                <h2>{song[1]}</h2>
              </div>
            </div>
            <div className="p-3">
              <hr />
            </div>
            <div>
              <div className="font-semibold text-2xl text-slate-600">
                <div className="flex">
                  <div className="bg-slate-600 w-5 mt-[10px]  h-5 rounded-full"></div>
                  <div className="ml-2 text-3xl font-semibold text-slate-600">
                    Album
                  </div>
                </div>
              </div>

              <div className="border-l-2 p-2 ml-2">
                <div className="     ">
                  {album ? (
                    <div className="flex flex-grow-1 flex-wrap gap-8">
                      {album.map((item, index) => {
                        return (
                          <>
                            <div className="text-sm text-slate-700">
                              <div className="text-xl">{item.title}</div>
                              <div>{item.releaseDate}</div>
                              <div>
                                <img
                                  src={item.coverImageUrl}
                                  className="w-[200px]"
                                  alt=""
                                />
                              </div>
                              <div>{item.createdAt}</div>
                              <div>Gerne : {item.gerne}</div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    <div>No Ablum Found</div>
                  )}
                </div>
              </div>
              <div className="p-3">
                <hr />
              </div>
              <div className="font-semibold text-2xl text-slate-600">
                <div className="flex">
                  <div className="bg-slate-600 w-5 mt-[10px]  h-5 rounded-full"></div>
                  <div className="ml-2 text-3xl font-semibold text-slate-600">
                    Track
                  </div>
                </div>
              </div>
              <div className="border-l-2 ml-2">
                <div className="flex flex-wrap gap-8">
                  {tarck ? (
                    <>
                      {tarck.map((item, index) => {
                        return (
                          <>
                            <div className="font-sans text-slate-600 text-sm p-3">
                              <div className="text-xl">{item.title}</div>
                              <div>{item.createdAt}</div>
                              <div>
                                <img
                                  src={item.coverImage}
                                  className="w-[150px] h-[150px]"
                                  alt="image_not_available"
                                />
                              </div>
                              <div>{item.duration}</div>
                              <div>Likes : {item.like}</div>
                              <div className="ml-3">
                                <audio controls>
                                  <source
                                    src={item.audioFile}
                                    type="audio/mp3"
                                  />
                                  Your browser does not support the audio
                                  element.
                                </audio>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>Track or Song are not available</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDataView;
