

import React, { useState } from "react";
import {
  FaMusic,
  FaSearch,
  FaBell
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ user, setUser }) {
  const[searchText, setSearchText] = useState("")

  const navigate = useNavigate();

  const handleSearch = () => {
    if(searchText.trim() === "") return;
      navigate(`/search?q=${searchText}`);
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      setUser(null);   // 🔥 state update
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between border-b border-neutral-800">

      {/* LEFT */}
      <div className="flex items-center gap-2 text-2xl font-bold">
        <FaMusic className="text-green-500" />
        <span>MyMusic</span>
      </div>

      {/* CENTER */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 w-1/3 hover:bg-neutral-700 transition">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search songs, artists..."
          className="bg-transparent outline-none text-white w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSearch()
            }
          }}
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        <FaBell className="text-xl cursor-pointer hover:text-green-500 transition" />

        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm hover:text-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/signup"
              className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;