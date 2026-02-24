
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [music, setMusic] = useState([]);

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // const songs = [
  //   { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
  //   { id: 2, title: "Shape of You", artist: "Ed Sheeran" },
  //   { id: 3, title: "Believer", artist: "Imagine Dragons" },
  //   { id: 4, title: "Levitating", artist: "Dua Lipa" },
  // ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/music/")
      .then((res) => {
        setMusic(res.data.musics);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen text-white p-8">
      <h1>hello this is </h1>

      {/* ✅ Show only if artist */}
      {user?.role === "artist" && (
        <Link
          to="/create"
          className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition "
        >
          Create Music 
        </Link>
      )}

      <h1 className="text-3xl font-bold mb-6">Trending Songs 🎵</h1>
      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {music.map((song) => (
          <div
            key={song._id}
            className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition"
          >
            <audio controls className="w-full mb-4">
              <source src={song.uri} type="audio/mpeg" />
            </audio>

            <h2 className="font-semibold text-lg">{song.title}</h2>
            <p className="text-sm text-gray-400">{song.artist?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
