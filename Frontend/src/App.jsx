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
import AllAlbums from "./pages/AllAlbums.jsx";
import AlbumDetails from "./pages/AlbumDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchPage from "./pages/SearchPage.jsx";
import { useState,useEffect } from "react";

const App = () => {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <>
      {/* <h1>Hello this is home page</h1> */}
      <Router>
        <Nav user={user} setUser={setUser}  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/all-albums" element={<AllAlbums />} />
          <Route path="/album/:albumId" element={<AlbumDetails />} />
          <Route path="/search" element={<SearchPage />} />
          

          


          <Route
            path="/create-music"
            element={
              <ProtectedRoute role="artist">
                <CreateMusic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-album"
            element={
              <ProtectedRoute role="artist">
                <CreateAlbum />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
