import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryContext from "../context/CategoryContext";
import CreatePlaylist from "./CreatePlaylist";

const Navbar = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
          >
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hidden">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex justify-center">
            Z
          </p>
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
          {/* Category Buttons */}
          <div
            onClick={() => {
              setCategory("all");
              toggleMenu();
            }}
            className={`text-white py-2 px-4 mb-2 rounded-full cursor-pointer transition duration-300 ease-in-out ${
              category === "all"
                ? "bg-green-500 text-black"
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
                ? "bg-green-500 text-black"
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
                ? "bg-green-500 text-black"
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
      <div>
      {isModalOpen && <CreatePlaylist setIsModalOpen={setIsModalOpen} />}
      </div>
      
      <div className="hidden md:flex items-center gap-2 mt-4">
     
        <p
          onClick={() => setCategory("all")}
          className={`px-4 py-1 rounded-2xl cursor-pointer transition duration-300 ease-in-out ${
            category === "all"
              ? "bg-green-500 text-black"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
        >
          All
        </p>
        <Link to="">
          <p
            onClick={() => setCategory("music")}
            className={`px-4 py-1 rounded-2xl cursor-pointer transition duration-300 ease-in-out ${
              category === "music"
                ? "bg-green-500 text-black"
                : "bg-black text-white hover:bg-white hover:text-black"
            }`}
          >
            Music
          </p>
        </Link>
        <p
          onClick={() => setCategory("podcast")}
          className={`px-4 py-1 rounded-2xl cursor-pointer transition duration-300 ease-in-out ${
            category === "podcast"
              ? "bg-green-500 text-black"
              : "bg-black text-white hover:bg-white hover:text-black"
          }`}
        >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
