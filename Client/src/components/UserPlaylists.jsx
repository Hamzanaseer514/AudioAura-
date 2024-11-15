import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Player from "./Player";
import Navbar from "./Navbar";
import { TiDelete } from "react-icons/ti";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [Songs, setSongs] = useState([]); // Store song details
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (data.success) {
          setPlaylists(data.playlists);
        } else {
          setError("Failed to fetch playlists");
        }
      } catch (error) {
        setError("Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const fetchSongsByIds = async (songIds) => {
    try {
      const response = await fetch(
        "http://localhost:3000/user/getSongsByPlaylist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ songIds }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSongs(data.songs);
      } else {
        setError("Error fetching songs");
      }
    } catch (error) {
      setError("Error fetching songs");
    }
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    fetchSongsByIds(playlist.songs);
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
            <div className="bg-[#1a1a1a] mt-5 rounded-lg p-6 shadow-2xl">
              <button
                onClick={() => setSelectedPlaylist(null)}
                className="text-teal-400 hover:underline mb-4 text-lg"
              >
                &larr; Back to Playlists
              </button>

              {/* Playlist Details */}
              <div className="flex items-center mb-8">
                <img
                  src={
                    selectedPlaylist.image || "https://via.placeholder.com/150"
                  }
                  alt={selectedPlaylist.title}
                  className="w-36 h-36 mr-6 rounded-lg object-cover border-4 border-teal-400"
                />
                <div>
                  <h2 className="text-6xl font-bold text-white">
                    {selectedPlaylist.name}
                  </h2>
                  <p className="text-gray-400 text-xl mt-2">
                    A collection of relaxing tunes.{" "}
                    {selectedPlaylist.songs.length} songs
                  </p>
                </div>
              </div>

              {/* Song List */}
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3">#</th>
                    <th className="py-3">Title</th>
                    {/* <th className="py-3">Singer</th> */}
                    <th className="py-3">Date Added</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Songs.map((song, index) => (
                    <tr key={index} className="text-white hover:bg-gray-800">
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4 flex items-center">
                        <img
                          src={song.image || "https://via.placeholder.com/50"}
                          alt={song.name}
                          className="w-10 h-10 mr-4 rounded-lg"
                        />
                        {song.name}
                      </td>
                      {/* <td className="py-4">{song.name}</td> */}
                      {/* <td className="py-4">{song.singer}</td> */}
                      <td className="py-4">5 days ago</td>
                      <td className="py-4">
                        <button className="text-[#00ABE4] py font-semibold text-2xl hover:text-[#00abe4d2] transition duration-300">
                          <TiDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <div
                    key={playlist._id}
                    onClick={() => handlePlaylistClick(playlist)}
                    className="relative bg-[#1f1f1f] rounded-lg p-6 cursor-pointer hover:bg-[#333333] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-lg opacity-40"
                      style={{
                        backgroundImage: `url(${
                          playlist.image || "https://via.placeholder.com/150"
                        })`,
                      }}
                    ></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400 mb-4">
                        <img
                          src={
                            playlist.image || "https://via.placeholder.com/150"
                          }
                          alt={playlist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {playlist.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">
                        {playlist.songs.length} Songs
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-white text-center">
                  No Playlists Available
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default PlaylistPage;
