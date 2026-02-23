import { 
  FaMusic, 
  FaSearch, 
  FaBell, 
  FaUserCircle 
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between  border-b border-neutral-800">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FaMusic className="text-green-500" />
          <span>MyMusic</span>
        </div>

       

      </div>


      {/* CENTER SECTION - SEARCH */}
      <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 w-1/3 hover:bg-neutral-700 transition">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search songs, artists..."
          className="bg-transparent outline-none text-white w-full"
        />
      </div>


      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <FaBell className="text-xl cursor-pointer hover:text-green-500 transition" />

        {/* Profile */}
        <FaUserCircle className="text-2xl cursor-pointer hover:text-green-500 transition" />

        {/* Login */}
        <Link to="/login" className="text-gray-300 hover:text-white transition">
          Login
        </Link>

        {/* Sign Up */}
        <Link to="/signup" className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition">
          Sign Up
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;