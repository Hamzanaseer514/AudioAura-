import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Player from "./Player";
import Navbar from "./Navbar";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]); // Store song details
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState(null);

  // Fetch playlists from API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        const { success, playlists } = data;
        if (success) {
          setPlaylists(playlists);
        } else {
          console.error("Failed to fetch playlists");
          setError("Failed to fetch playlists");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  // Fetch songs based on the selected playlist
  const fetchSongsByIds = async (songIds) => {
    try {
      const response = await fetch("http://localhost:3000/user/getSongsByPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songIds }),
      });
      
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setSongs(data.songs); // Store the fetched songs
      } else {
        alert(data.message);
        setError("Error fetching songs");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error fetching songs");
    }
  };

  // Handle playlist click
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    fetchSongsByIds(playlist.songs); // Fetch songs for the selected playlist
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          <Navbar />

          {loading ? (
            <div className="text-white text-center py-10">
              Loading playlists...
            </div>
          ) : error ? (
            <div className="text-white text-center py-10">{error}</div>
          ) : selectedPlaylist ? (
            <div className="bg-[#1a1a1a] mt-5 rounded-lg p-6 shadow-2xl transform transition duration-300 hover:scale-105">
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="text-teal-400 hover:underline mb-4 text-lg"
              >
                &larr; Back to Playlists
              </button>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0 flex justify-end">
                  <img
                    src={selectedPlaylist.image || "https://via.placeholder.com/150"}
                    alt={selectedPlaylist.title}
                    className="w-48 h-48 rounded-lg object-cover border-4 border-teal-400 shadow-xl"
                  />
                </div>
                <div className="w-full lg:w-2/3">
                  <h2 className="text-4xl font-semibold text-white mb-4">
                    {selectedPlaylist.title}
                  </h2>
                  <p className="text-gray-400 mb-6">{selectedPlaylist.description}</p>
                  <ul className="space-y-2">
                    {songs.map((song, index) => (
                      <li key={index} className="text-lg text-gray-300">
                        🎶 {song.title} by {song.artist}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => handlePlaylistClick(playlist)}
                  className="relative bg-[#1f1f1f] rounded-lg p-6 cursor-pointer hover:bg-[#333333] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg opacity-40"
                    style={{
                      backgroundImage: `url(${playlist.image || "https://via.placeholder.com/150"})`,
                    }}
                  ></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400 mb-4">
                      <img
                        src={playlist.image || "https://via.placeholder.com/150"}
                        alt={playlist.title}
                        className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {playlist.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">
                        {playlist.status} • {playlist.songs.length} Songs
                      </p>
                      <a
                        href="#"
                        className="text-teal-400 hover:underline text-sm"
                      >
                        View full playlist
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default PlaylistPage;
