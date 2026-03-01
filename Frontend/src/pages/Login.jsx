

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData, 
        { withCredentials: true } //Cookie set ho rahi hai. But browser tabhi cookie accept karega jab: frontend request me withCredentials: true likha ho.
      );

      alert(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);   //  THIS LINE FIXES EVERYTHING

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-zinc-800"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-zinc-800"
            required
          />

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 p-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;