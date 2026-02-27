import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [music, setMusic] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/music/")
      .then((res) => {
        setMusic(res.data.musics);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-neutral-900 to-gray-900 min-h-screen text-white p-8">
      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {user?.role === "artist" && (
          <>
            <Link
              to="/create-music"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              Create Music
            </Link>

            <Link
              to="/create-album"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              Create Album
            </Link>
          </>
        )}

        <Link
          to="/all-albums"
          className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
        >
          All Albums
        </Link>
      </div>

      {/* Trending Songs */}
      <h1 className="text-4xl font-extrabold mb-6 text-white tracking-wide">
        Trending Songs 🎵
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {music.map((song) => (
          <div
            key={song._id}
            className="relative bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-md 
                       hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300"
          >
            <audio controls className="w-full mb-4 rounded-md">
              <source src={song.uri} type="audio/mpeg" />
            </audio>

            <h2 className="font-bold text-lg text-white mb-1 hover:text-pink-400 transition-colors">
              {song.title}
            </h2>
            <p className="text-gray-300 text-sm">{song.artist?.name || "Unknown"}</p>

            {/* Gradient accent bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-b-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;