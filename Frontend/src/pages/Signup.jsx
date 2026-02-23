import React,{useState} from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", //default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      alert(res.data.message); // Signup successful
      console.log("Signup Response:", res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 mb-4 rounded bg-zinc-800"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-zinc-800"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-zinc-800"
          />

          <div className="mb-4">
            <p className="mb-2 font-semibold">Sign up as:</p>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                User 🎧
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === "artist"}
                  onChange={handleChange}
                />
                Artist 🎤
              </label>
            </div>
          </div>

          <button className="w-full bg-green-500 p-2 rounded font-semibold">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
