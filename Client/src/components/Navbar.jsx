import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryContext from "../context/CategoryContext";
import CreatePlaylist from "./CreatePlaylist";

// Function to decode JWT
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

const Navbar = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  // Decode the token from localStorage
  const token = localStorage.getItem("token");
  let name = "";

  if (token) {
    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.name) {
      name = decodedToken.name;
    }
  }

  // Extract initials from the name
  const nameParts = name ? name.split(" ") : ["U", "N"];
  const firstCharacter = nameParts[0]?.charAt(0).toUpperCase() || "U";
  const secondCharacter = nameParts[1]?.charAt(0).toUpperCase() || "N";

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      alert("Logged Out Successfully");
      navigate("/");
    }, 1000);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Next"
          />
        </div>
        <div className="flex items-center gap-4">
          <p
            onClick={() => navigate("/spotify/premium")}
            className="bg-[#00ABE4]  text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
          >
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hidden">
            Install App
          </p>
          <p
            onClick={handleAvatarClick}
            className="bg-purple-500 text-black w-8 cursor-pointer h-7 rounded-full flex justify-center"
          >
            {firstCharacter + secondCharacter}
          </p>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-6 top-16 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10"
              onClick={() => setIsDropdownOpen(false)}
            >
              <div className="py-2">
                <Link to="/user-profile">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black">
                    Profile
                  </button>
                </Link>
                <Link to="/user-playlist">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black">
                    Playlists
                  </button>
                </Link>
                <Link to="/user-favourite">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black">
                  Favorites
                </button>
                </Link>
                <Link to="/spotify">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black">
                  Music
                </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
          {/* Hamburger Icon */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <img src={assets.humberger_icon} alt="menu" className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-black bg-opacity-90 backdrop-blur-md z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 p-5 duration-300`}
      >
        <div className="text-white text-right">
          <button onClick={toggleMenu} className="text-xl">
            ✕
          </button>
        </div>

        {/* Home and Search Menu */}
        <div className="flex flex-col mt-6">
          <Link to="/" onClick={toggleMenu}>
            <div className="text-white flex items-center bg-black py-2 px-4 rounded-full mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-black">
              <img src={assets.home_icon} alt="Home" className="w-6 h-6 mr-2" />
              <p>Home</p>
            </div>
          </Link>
          <div
            onClick={toggleSearch}
            className="text-white flex items-center bg-black py-2 px-4 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-black"
          >
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-6 h-6 mr-2"
            />
            <p>Search</p>
          </div>

          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="w-full mt-4 py-2 px-3 rounded-lg text-black transition duration-300 ease-in-out"
            />
          )}
        </div>

        {/* Category Options */}
        <div className="mt-6">
          <div
            onClick={() => {
              setCategory("all");
              toggleMenu();
            }}
            className={`text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out ${
              category === "all"
                ? "bg-[#00ABE4] text-black"
                : "bg-black hover:bg-white hover:text-black"
            }`}
          >
            All
          </div>
          <div
            onClick={() => {
              setCategory("music");
              toggleMenu();
            }}
            className={`text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out ${
              category === "music"
                ? "bg-[#00ABE4] text-black"
                : "bg-black hover:bg-white hover:text-black"
            }`}
          >
            Music
          </div>
          <div
            onClick={() => {
              setCategory("podcast");
              toggleMenu();
            }}
            className={`text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out ${
              category === "podcast"
                ? "bg-[#00ABE4] text-black"
                : "bg-black hover:bg-white hover:text-black"
            }`}
          >
            Podcasts
          </div>
        </div>

        {/* Separator Line */}
        <hr className="my-4 border-t-2 border-gray-600" />

        {/* Playlist and Podcast Section */}
        <div className="mt-6">
          <p className="text-white text-lg font-semibold mb-4">Library</p>
          <div
            onClick={openModal}
            className="text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-black"
          >
            Create Playlist
          </div>

          <div className="text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-black">
            Browse Podcasts
          </div>
        </div>
      </div>
      {isModalOpen && <CreatePlaylist setIsModalOpen = {setIsModalOpen}  />}
    </>
  );
};

export default Navbar;
