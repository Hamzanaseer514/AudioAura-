import React, { useState } from 'react';
import { assets } from '../../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setActiveOption(option); // Update active option on click
    setIsSidebarOpen(false); // Close sidebar on option click
  };

  return (
    <nav className="bg-[#3F4D66] border-b-2 border-gray-300 p-4 relative">
      <div className="container flex justify-between items-center">
        {/* Left Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Centered Heading */}
        <div className="text-white text-lg font-bold lg:text-2xl">
          Spotify Admin Dashboard
        </div>

        {/* Right Menu Icon */}
        <div className="lg:hidden relative">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <img className="w-6" src={assets.menu_icon} alt="Menu" />
          </button>
          {isMenuOpen && (
            <div
              className={`absolute right-0 mt-2 bg-white text-black border border-gray-300 rounded shadow-lg p-4 space-y-2 w-32 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <a href="#profile" className="block text-black hover:bg-gray-200 py-2 px-4 rounded">Profile</a>
              <a href="#logout" className="block text-black hover:bg-gray-200 py-2 px-4 rounded">Logout</a>
            </div>
          )}
        </div>

        {/* Desktop Profile and Logout Links */}
        <div className="lg:flex items-center space-x-6 hidden lg:block">
          <a href="#profile" className="text-white hover:text-[#abacad] font-bold">Profile</a>
          <a href="#logout" className="text-white hover:text-[#abacad] font-bold">Logout</a>
        </div>
      </div>

      {/* Sidebar for mobile with more options and icons */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#3F4D66] text-white shadow-lg z-50 p-4 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button onClick={toggleSidebar} className="text-white focus:outline-none mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="space-y-3 mt-8">
          <Link
            to="/dashboard"
            className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-full ${
              activeOption === 'dashboard' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
            }`}
            onClick={() => handleOptionClick('dashboard')}
          >
            <img src={assets.dashboard_icon} alt="icon" className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-full ${
              activeOption === 'users' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
            }`}
            onClick={() => handleOptionClick('users')}
          >
            <img src={assets.user_icon} alt="icon" className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            to="/albums"
            className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-full ${
              activeOption === 'albums' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
            }`}
            onClick={() => handleOptionClick('albums')}
          >
            <img src={assets.albums_icon} alt="icon" className="w-5 h-5 mr-3" />
            Albums
          </Link>
          <Link
            to="/playlists"
            className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-full ${
              activeOption === 'playlists' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
            }`}
            onClick={() => handleOptionClick('playlists')}
          >
            <img src={assets.playlist_icon} alt="icon" className="w-5 h-5 mr-3" />
            Playlists
          </Link>
          <Link
            to="/tracks"
            className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-full ${
              activeOption === 'tracks' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
            }`}
            onClick={() => handleOptionClick('tracks')}
          >
            <img src={assets.music_icon} alt="icon" className="w-5 h-5 mr-3" />
            Tracks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
