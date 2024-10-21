import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import Navbar from '../components/Navbar'; // Import Navbar

const Playlist = () => {
  const [activeOption, setActiveOption] = useState("playlists"); // State for active sidebar option

  // Handle sidebar option click
  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <Sidebar
            activeOption={activeOption}
            handleOptionClick={handleOptionClick}
          />
        </div>
        <div className="w-auto flex-1 lg:ml-60 mt-14 ">
          <h1 className="text-2xl font-bold text-center mt-6">Playlist</h1>
          {/* Add your playlist content here */}
        </div>
      </div>
    </>
  );
};

export default Playlist;
