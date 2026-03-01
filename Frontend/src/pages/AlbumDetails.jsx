import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AlbumDetails = () => {
  const { albumId } = useParams(); //URL se albumId leta hai
  const [album, setAlbum] = useState(null); //initially null hai jb backend se data aayega tb update hoga 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/music/albums/${albumId}`)
      .then((res) => {
        setAlbum(res.data.album);
      })
      .catch((err) => console.log(err));
  }, [albumId]);

  if (!album) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50">
        <p className="text-lg text-gray-500 animate-pulse">Loading album...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl">
        {/* Album Info */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{album.title}</h1>
          <p className="text-gray-700 text-lg mb-2">Artist: {album.artist?.name || "Unknown"}</p>
          {album.description && (
            <p className="text-gray-500 text-base">{album.description}</p>
          )}
        </div>

        {/* Songs */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">Songs</h2>

          {album.musics.length === 0 ? (
            <p className="text-gray-500 text-lg">No songs in this album</p>
          ) : (
            <ul className="space-y-4">
              {album.musics.map((song) => (
                <li
                  key={song._id}
                  className="relative bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md 
                             hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
                >
                  <p className="font-semibold text-gray-800 text-lg">{song.title}</p>
                  <audio controls className="w-full mt-2 rounded-md">
                    <source src={song.uri} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  {/* Gradient accent bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-b-2xl"></div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link
            to="/all-albums"
            className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                       text-white px-8 py-3 rounded-full font-semibold shadow-lg 
                       hover:scale-105 hover:shadow-2xl transition-transform"
          >
            Back to Albums
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;