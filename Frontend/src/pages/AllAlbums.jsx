import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const AllAlbums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/music/albums")
        .then((res) => {
            setAlbums(res.data.albums);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 py-12 px-4 md:px-8">
            {/* Page Title */}
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
                All Albums
            </h1>

            {/* Empty State */}
            {albums.length === 0 && (
                <p className="text-center text-gray-500 text-lg animate-pulse">No albums available yet!</p>
            )}

            {/* Albums Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {albums.map(album => (
                    <Link 
                        key={album._id}
                        to={`/album/${album._id}`}
                    >
                        <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl 
                                        hover:shadow-2xl hover:-translate-y-3 transform transition-all duration-300 cursor-pointer overflow-hidden p-6">
                            {/* Album Info */}
                            <h2 className="font-bold text-2xl text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                                {album.title}
                            </h2>
                            <p className="text-gray-700 text-sm mb-1">
                                Artist: {album.artist?.name || "Unknown"}
                            </p>
                            <p className="text-gray-700 text-sm">
                                Total Songs: {album.musics?.length || 0}
                            </p>

                            {/* Gradient Accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Home Button */}
            <div className="text-center mt-12">
                <Link
                    to="/"
                    className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                               text-white px-8 py-3 rounded-full font-semibold shadow-lg 
                               hover:scale-105 hover:shadow-2xl transition-transform"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    )
}

export default AllAlbums;