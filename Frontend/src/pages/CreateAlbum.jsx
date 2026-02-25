import React, { useState, useEffect } from 'react';
import axios from "axios";

const CreateAlbum = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/music/albums")
        .then((res) => {
            setAlbums(res.data.albums); // backend me albums key yehi hai
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Albums</h1>
            
            {albums.length === 0 && <p>No albums yet!</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {albums.map(album => (
                    <div key={album._id} className="bg-neutral-800 p-4 rounded-lg">
                        <h2 className="font-semibold text-lg">{album.title}</h2>
                        <p className="text-sm text-gray-400">
                            Artist: {album.artist?.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            Total Songs: {album.musics?.length || 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateAlbum;

//abnum artist craete krta hai nirmal user nhi
// Production me process aisa hota hai:

// Step 1:
// Artist login karta hai

// Step 2:
// Artist ne already kuch songs upload kiye hote hain

// Step 3:
// Frontend me ek button dikhega:
// 👉 “Create Album” (sirf artist ko visible)

// Step 4:
// Artist:
// Album ka title likhega
// Apne uploaded songs me se select karega
// Submit karega

// Step 5:
// Backend check karega:
// Role artist hai?
// Songs usi artist ke hain?
// Duplicate to nahi?
// Phir album create ho jayega.