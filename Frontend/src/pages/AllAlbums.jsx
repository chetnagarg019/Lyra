// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { Link } from "react-router-dom";
// const AllAlbums = () => {
//     const [albums, setAlbums] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/music/albums")
//         .then((res) => {
//             setAlbums(res.data.albums); // backend me albums key yehi hai
//         })
//         .catch((err) => console.log(err));
//     }, []);

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Your Albums</h1>

//             {albums.length === 0 && <p>No albums yet!</p>}

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {albums.map(album => (
//                     <div key={album._id} className="bg-pink-200 p-4 rounded-lg">
//                         <h2 className="font-semibold text-lg">{album.title}</h2>
//                         <p className="text-sm text-gray-400">
//                             Artist: {album.artist?.name}
//                         </p>
//                         <p className="text-sm text-gray-400">
//                             Total Songs: {album.musics?.length || 0}
//                         </p>
//                     </div>
//                 ))}
//             </div>

            
//            <Link
//             to="/"
//             className="bg-red-400 mt-4 text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition ml-3"
//           >
//             go to home
//           </Link>
//         </div>
//     )
// }

// export default AllAlbums;

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Albums</h1>

            {albums.length === 0 && <p>No albums yet!</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {albums.map(album => (
                    <Link 
                        key={album._id}
                        to={`/album/${album._id}`}
                    >
                        <div className="bg-pink-200 p-4 rounded-lg 
                                        hover:shadow-xl 
                                        hover:-translate-y-1 
                                        transition 
                                        cursor-pointer">
                            <h2 className="font-semibold text-lg">
                                {album.title}
                            </h2>

                            <p className="text-sm text-gray-700">
                                Artist: {album.artist?.name}
                            </p>

                            <p className="text-sm text-gray-700">
                                Total Songs: {album.musics?.length || 0}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <Link
                to="/"
                className="bg-red-400 mt-6 inline-block text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition"
            >
                Go to Home
            </Link>
        </div>
    )
}

export default AllAlbums;