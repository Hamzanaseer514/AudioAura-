import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Navbar from "../components/Navbar"; // Import Navbar

const Playlist = () => {
  const [activeOption, setActiveOption] = useState("playlists");
  const [playlists, setPlaylists] = useState([]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://audioaura-4sap.onrender.com/user/getAllPlaylist");
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] min-h-screen text-gray-900">
        {/* Sidebar */}
        <div>
          <Sidebar
            activeOption={activeOption}
            handleOptionClick={handleOptionClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-60 mt-14 px-6">
          <h1 className="text-4xl font-bold text-center text-[#495057] mt-6">
            Your Playlists
          </h1>

          {/* Playlist Table */}
          <div className="mt-8 overflow-x-auto">
            {playlists.length > 0 ? (
              <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-[#e9ecef] text-[#495057]">
                    <th className="p-4 border-b border-[#dee2e6]">#</th>
                    <th className="p-4 border-b border-[#dee2e6]">Name</th>
                    <th className="p-4 border-b border-[#dee2e6]">Description</th>
                    <th className="p-4 border-b border-[#dee2e6]">Status</th>
                    <th className="p-4 border-b border-[#dee2e6]">Songs Count</th>
                  </tr>
                </thead>
                <tbody>
                  {playlists.map((playlist, index) => (
                    <tr
                      key={playlist._id}
                      className="text-center hover:bg-[#f1f3f5] transition-all"
                    >
                      <td className="p-4 border-b border-[#dee2e6]">
                        {index + 1}
                      </td>
                      <td className="p-4 border-b border-[#dee2e6]">
                        {playlist.name}
                      </td>
                      <td className="p-4 border-b border-[#dee2e6]">
                        {playlist.description}
                      </td>
                      <td className="p-4 border-b border-[#dee2e6]">
                        {playlist.status}
                      </td>
                      <td className="p-4 border-b border-[#dee2e6]">
                        {playlist.songs.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-6 text-gray-600">
                No playlists found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
