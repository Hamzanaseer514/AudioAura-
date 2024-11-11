import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const UserFavourite = () => {
  const userFavorites = [
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
    { title: "Song 3", artist: "Artist 3" },
    { title: "Song 4", artist: "Artist 4" },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Navbar */}
          <Navbar />

          {/* Favourites Section */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl mt-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Your Favourites</h2>

            {/* Favourites List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userFavorites.map((favorite, index) => (
                <div
                  key={index}
                  className="bg-[#2c2c2c] p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:bg-teal-600 hover:scale-105"
                >
                  {/* Card Content */}
                  <div className="relative flex flex-col items-center bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-lg">
                    <div className="w-20 h-20 bg-teal-400 rounded-full flex items-center justify-center text-2xl text-white font-semibold mb-4 shadow-lg">
                      {/* Placeholder Icon or Image */}
                      🎶
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{favorite.title}</h3>
                    <p className="text-sm text-gray-200 mb-4">{favorite.artist}</p>
                    
                    {/* Play Button with Hover Effect */}
                    <button className="px-4 py-2 bg-teal-700 text-white rounded-full text-sm font-semibold transform transition duration-200 hover:bg-teal-800 hover:scale-105">
                      Play
                    </button>
                    
                    {/* Special Hover Effect for Card */}
                    <div className="absolute top-0 left-0 w-full h-full bg-teal-700 opacity-0 hover:opacity-40 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Component */}
      <Player />
    </div>
  );
};

export default UserFavourite;
