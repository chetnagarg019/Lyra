import React from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateMusic = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await API.post("/api/music/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Song created successfully 🎵");
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating music");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Upload New Song 🎵</h1>

      <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          required
          className="w-full p-2 rounded bg-neutral-800"
        />

        <input
          type="file"
          name="music"  // <-- backend me agar upload.single("music") hai to
          required
          className="w-full p-2 rounded bg-neutral-800"
        />

        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded font-semibold"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateMusic;
