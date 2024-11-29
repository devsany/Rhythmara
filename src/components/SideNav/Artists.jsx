import React, { useState, useRef, useEffect } from "react";
import { getDatabase, get, ref, push, set, update } from "firebase/database";
import app from "../../firebase/firebaseConfig";
import SideLeftNav from "../Navbar/SideLeftNav";
import { NavLink } from "react-router-dom";

const Artists = () => {
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
    const dataRef = ref(db, `artists`);
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
  //   const fetchTrackArtist = async () => {
  //     const db = getDatabase(app);
  //     const dataRef = ref(db, `artist`);
  //     const snapshot = await get(dataRef);
  //     if (snapshot.exists()) {
  //       const entries = Object.values(snapshot.val());
  //       setSong(entries);
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

  const newRlease = song.filter((item) => {
    return item.category === "newReleases";
  });

  //check the data and getting the value
  const fetchData = async () => {
    const db = getDatabase();
    const usersRef = ref(db, "artists");

    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.entries(data).map(([id, value]) => ({
          id, // unique ID
          ...value, // spread the rest of the data
        }));
        setSong(formattedData); // [{id: "user1", name: "Alice", age: 25}, ...]
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
  console.log(song);
  useEffect(() => {
    fetchArtist();
    fetchData();
  }, []);
  return (
    <div className="music-player dark:bg-slate-600">
      <div className="grid md:grid-cols-12  ">
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
            <div className="m-6"> hii</div>
          </div>
          <div className="mb-3   md:block hidden">
            {" "}
            <hr />
          </div>
          <div className="flex   flex-wrap gap-5   mt-[50px]">
            {song &&
              song.map((item, index) => {
                return (
                  <>
                    <NavLink to={item.id}>
                      <div>
                        <img
                          className="hover:shadow-lg  transition duration-200 ease-in-out hover:shadow-purple-300   w-[150px] h-[150px] rounded-full"
                          src={item.profileImage}
                          alt={item.bio}
                        />
                      </div>
                      <div className="text-center font-semibold text-slate-600">
                        {item.name}
                      </div>
                    </NavLink>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Artists;
