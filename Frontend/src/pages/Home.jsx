// import React from "react";
// import { FaPlay } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const songs = [
//     { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
//     { id: 2, title: "Shape of You", artist: "Ed Sheeran" },
//     { id: 3, title: "Believer", artist: "Imagine Dragons" },
//     { id: 4, title: "Levitating", artist: "Dua Lipa" },
     
//   ];

//   return (
//     <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen text-white p-8">
      
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6">Trending Songs 🎵</h1>

//        <Link to="/create" className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition">
//           Create Post
//         </Link>

//       {user?.role === "artist" && (
//   <Link to="/create">Create Music</Link>
// )}

//       {/* Songs Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {songs.map((song) => (
//           <div
//             key={song.id}
//             className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition relative group"
//           >
//             {/* Fake Thumbnail */}
//             <div className="h-40 bg-neutral-700 rounded mb-4 flex items-center justify-center">
//               <span className="text-gray-400">Thumbnail</span>
//             </div>

//             <h2 className="font-semibold text-lg">{song.title}</h2>
//             <p className="text-sm text-gray-400">{song.artist}</p>

//             {/* Play Button */}
//             <button className="absolute bottom-16 right-4 bg-green-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition">
//               <FaPlay className="text-black" />
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const songs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 2, title: "Shape of You", artist: "Ed Sheeran" },
    { id: 3, title: "Believer", artist: "Imagine Dragons" },
    { id: 4, title: "Levitating", artist: "Dua Lipa" },
  ];

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
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition relative group"
          >
            <div className="h-40 bg-neutral-700 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400">Thumbnail</span>
            </div>

            <h2 className="font-semibold text-lg">{song.title}</h2>
            <p className="text-sm text-gray-400">{song.artist}</p>

            <button className="absolute bottom-16 right-4 bg-green-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition">
              <FaPlay className="text-black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;