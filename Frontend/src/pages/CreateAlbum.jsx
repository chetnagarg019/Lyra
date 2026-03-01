
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const [title, setTitle] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const navigate = useNavigate();

  // 🔐 Role Check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "artist") {
      alert("Only artists can create albums");
      navigate("/");
    }
  }, [navigate]);

  // 🎵 Fetch ONLY artist's songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/music/my-songs", //my-songs vale route me sirf vhi songs aaynege jiss artist ne logged in kr rkha hoga
          { withCredentials: true }
        );

        setSongs(res.data); // backend se direct array aa raha hai
      } catch (err) {
        console.log("Error fetching songs:", err);
      }
    };

    fetchSongs();
  }, []);

  // 🎶 Checkbox handler
  const handleSongSelect = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSongs([...selectedSongs, value]);
    } else {
      setSelectedSongs(
        selectedSongs.filter((id) => id !== value)
      );
    }
  };

  // 📀 Submit Album
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Album title is required");
      return;
    }

    if (selectedSongs.length === 0) {
      alert("Please select at least one song");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/music/album",   // ✅ correct route
        {
          title,
          musics: selectedSongs,   // ✅ backend expects musics
        },
        { withCredentials: true }
      );

      alert("Album created successfully 🎉");
      navigate("/all-albums");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating album");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Album
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Album Title */}
          <input
            type="text"
            placeholder="Album Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-6 rounded bg-zinc-800"
            required
          />

          {/* Song List */}
          <div className="mb-6">
            <p className="mb-2 font-semibold">Select Songs:</p>

            {songs.length === 0 && (
              <p className="text-gray-400 text-sm">
                You have no uploaded songs yet.
              </p>
            )}

            {songs.map((song) => (
              <div key={song._id} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={song._id}
                  onChange={handleSongSelect}
                />
                <span>{song.title}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 p-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Create Album
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbum;