import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Nav from "./pages/Nav.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreateMusic from "./pages/CreateMusic.jsx";
import CreateAlbum from "./pages/CreateAlbum.jsx";


import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      {/* <h1>Hello this is home page</h1> */}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/create-album" element={<CreateAlbum />} />
          
          <Route
            path="/create-music"
            element={
              <ProtectedRoute role="artist">
                <CreateMusic />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
