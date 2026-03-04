import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const CreateMusic = () => {
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);  

  //   try {
  //     await API.post("/api/music/create", formData, { 
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     alert("Song created successfully 🎵");
  //     e.target.reset();
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err.response?.data || err.message);
  //     alert(err.response?.data?.message || "Error creating music");
  //   }
  // };

  

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    await axios.post(
      "https://lyra-backend-topaz.vercel.app/api/music/create",  // ✅ full backend URL
      formData,
      {
        withCredentials: true,   // cookies ke liye
      }
    );

    alert("Song created successfully 🎵");
    e.target.reset();
    navigate("/");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Error creating music");
  }
};

  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://lyra-backend-topaz.vercel.app/api/music/my-songs", //my-songs vale route me sirf vhi songs aaynege jiss artist ne logged in kr rkha hoga
  //         { withCredentials: true }
  //       );

  //       setSongs(res.data); // backend se direct array aa raha hai
  //     } catch (err) {
  //       console.log("Error fetching songs:", err);
  //     }
  //   };

  //   fetchSongs();
  // }, []);
  

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
