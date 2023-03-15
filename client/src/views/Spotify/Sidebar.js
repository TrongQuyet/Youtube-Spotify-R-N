import React from 'react';
import { FaHome, FaSearch, FaHeart, FaPlayCircle, FaPlus } from 'react-icons/fa';
import "./scss/Sidebar.scss"
import { Link, NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"  alt="Spotify logo" className="sidebar-logo" />
      <ul className="sidebar-menu">
      <NavLink to="/spotify"><li className="menu-item active">
          <FaHome />
          <span>Home</span>
        </li></NavLink>
        <NavLink to="/spotify/search">
        <li className="menu-item">
          <FaSearch />
          <span>Search</span>
        </li>
        </NavLink>

        <li className="menu-item">
          <FaHeart />
          <span>Your Library</span>
        </li>
      </ul>
      <div className="sidebar-playlist">
        <ul className="playlist-menu">
        <li>
            <FaPlus />
            <span>Create Playlist</span>
          </li>
          <li>
            <FaHeart />
            <span>Liked Song</span>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;