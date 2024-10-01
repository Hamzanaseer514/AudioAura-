import React from 'react';
import { assets } from '../../../assets/assets'; 
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = ({ activeOption, handleOptionClick }) => {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:block h-screen w-60 bg-[#3F4D66] text-white shadow-lg p-4">
      <div className="space-y-3 mt-8">
        <div
          to="/dashboard"
          className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-[100%] ${
            activeOption === 'dashboard' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
          }`}
          onClick={() => {handleOptionClick('dashboard'); navigate('/dashboard') }}
        >
          <img src={assets.dashboard_icon} alt="Dashboard" className="w-5 h-5 mr-5" />
          Dashboard
        </div>
        <Link
          to="/user"
          className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-[100%] ${
            activeOption === 'users' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
          }`}
          onClick={() => handleOptionClick('users')}
        >
          <img src={assets.user_icon} alt="Users" className="w-5 h-5 mr-5" />
          Users
        </Link>
        <Link
          to="/album"
          className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-[100%] ${
            activeOption === 'albums' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
          }`}
          onClick={() => handleOptionClick('albums')}
        >
          <img src={assets.albums_icon} alt="Albums" className="w-5 h-5 mr-5" />
          Albums
        </Link>
        <Link
          to="/playlist"
          className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-[100%] ${
            activeOption === 'playlists' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
          }`}
          onClick={() => handleOptionClick('playlists')}
        >
          <img src={assets.playlist_icon} alt="Playlists" className="w-5 h-5 mr-5" />
          Playlists
        </Link>
        <Link
          to="/track"
          className={`flex items-center py-2 px-6 rounded hover:bg-gray-600 transition-all w-[100%] ${
            activeOption === 'tracks' ? 'bg-gray-500 border-l-4 border-green-500' : 'bg-[#505b77]'
          }`}
          onClick={() => handleOptionClick('tracks')}
        >
          <img src={assets.music_icon} alt="Tracks" className="w-5 h-5 mr-5" />
          Tracks
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
