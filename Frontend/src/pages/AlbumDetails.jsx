import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/music/albums/${albumId}`)
      .then((res) => {
        setAlbum(res.data.album);
      })
      .catch((err) => console.log(err));
  }, [albumId]);

  if (!album) {
    return <p className="p-6">Loading album...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
      <p className="text-gray-600 mb-4">Artist: {album.artist?.name}</p>

      <h2 className="text-xl font-semibold mb-2">Songs:</h2>

      {album.musics.length === 0 ? (
        <p>No songs in this album</p>
      ) : (
        <ul className="space-y-2">
          {album.musics.map((song) => (
            <div key={song._id} className="bg-gray-200 p-3 rounded">
              <p className="font-semibold">{song.title}</p>

              <audio controls className="w-full mt-2">
                <source src={song.uri} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </ul>
      )}

      <Link
        to="/all-albums"
        className="inline-block mt-6 bg-blue-400 px-4 py-2 rounded"
      >
        Back to Albums
      </Link>
    </div>
  );
};

export default AlbumDetails;
