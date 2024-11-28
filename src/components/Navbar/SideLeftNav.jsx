import React from "react";
import { NavLink } from "react-router-dom";

const SideLeftNav = () => {
  return (
    <div>
      <div className=" border-r-2 h-screen">
        {/* nav bar section left (navbar--) */}
        <h2>Browse</h2>
        <div>
          <NavLink to="/">Tracks</NavLink>
        </div>
        <div>
          <NavLink to="release">New Releases</NavLink>
        </div>
        <div>
          <NavLink to="top_playlist">Top Playlist</NavLink>
        </div>
        <div>
          <NavLink to="top_charts">Top charts</NavLink>
        </div>
        <div>
          <NavLink to="podcast">podcast</NavLink>
        </div>
        <div>
          <NavLink to="radio_station">Radio Station</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideLeftNav;
