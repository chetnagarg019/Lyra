import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchPage() {

  const [results, setResults] = useState({ songs: [], albums: [] });

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if(query){
      axios.get(`http://localhost:5000/api/music/search`)
        .then(res => {
          setResults(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [query]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Search Results for "{query}"</h2>

      <h3 className="text-lg">Songs</h3>
      {results.songs.map(song => (
        <div key={song._id}>{song.title}</div>
      ))}

      <h3 className="text-lg mt-6">Albums</h3>
      {results.albums.map(album => (
        <div key={album._id}>{album.title}</div>
      ))}
    </div>
  );
}

export default SearchPage;