import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./sidebar";
import Player from "./Player";
import Navbar from "./Navbar";
import { TiDelete } from "react-icons/ti";
import { MdDeleteSweep } from "react-icons/md";

import SongContext from "../context/SongContext";
import ShowWhenNoThing from "./ShowWhenNoThing";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [GetPlaylistId, setGetPlaylistId] = useState(null);

  const { setPlaylistCount } = useContext(SongContext);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: { token: localStorage.getItem("token") },
        });
        const data = await response.json();
        if (data.success) {
          setPlaylists(data.playlists);
          setPlaylistCount(data.playlists.length);
        } else {
          setError("Failed to fetch playlists");
        }
      } catch (err) {
        setError("Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const fetchSongsByIds = async (songIds) => {
    try {
      const response = await fetch("http://localhost:3000/user/getSongsByIds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songIds }),
      });
      const data = await response.json();
      if (data.success) setSongs(data.songs);
      else setError("Error fetching songs");
    } catch (err) {
      setError("Error fetching songs");
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/playlist/${playlistId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      const { success, message } = data;
      if (success) {
        alert(message);
        const updatedPlaylists = playlists.filter(
          (playlist) => playlist._id !== playlistId
        );
        setPlaylists(updatedPlaylists);
      } else if (!success) {
        alert(message);
      }
    } catch (error) {
      throw new Error("Error deleting playlist");
    }
  };

  const deleteSongFromPlaylist = async (playlistId, songId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/deleteSong/${playlistId}/${songId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      const { success, message } = data;

      if (success) {
        alert(message);
        const updatedSongs = songs.filter((song) => song._id !== songId);
        setSongs(updatedSongs);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error deleting song from playlist:", error);
      alert("Error deleting song from playlist");
    }
  };

  const handlePlaylistClick = (playlist) => {
    if (playlist.songs && playlist.songs.length > 0) {
      const songIds = playlist.songs.map((song) => song._id); // Extract song IDs
      fetchSongsByIds(songIds); // Pass only IDs to the fetch function
    } else {
      setSongs([]); // Clear songs if the playlist has none
    }
    setGetPlaylistId(playlist._id);
    setSelectedPlaylist(playlist);
  };

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null);
    setSongs([]); // Clear the songs state when navigating back to playlists
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          <Navbar />
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="mr-8 mt-8 md:mb-0 flex items-center justify-center w-52 h-52 rounded-md bg-gradient-to-br from-purple-700 to-pink-500 shadow-2xl">
              <span className="text-6xl font-bold text-white">🎵</span>
            </div>
            <div>
              <h2 className="text-8xl font-extrabold text-white mb-2">
                Your Collection
              </h2>
              <p className="text-lg text-gray-300">
                Manage and explore your playlists.
              </p>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-white text-center py-10">{error}</div>
          ) : playlists.length === 0 ? (
            <ShowWhenNoThing title="Playlists" maintitle="Playlist" />
          ) : selectedPlaylist ? (
            <div className="bg-[#1a1a1a] mt-5 rounded-lg p-6 shadow-2xl">
              <button
                onClick={handleBackToPlaylists}
                className="text-teal-400 hover:underline mb-4 text-lg"
              >
                &larr; Back to Playlists
              </button>
              <div className="flex items-center mb-8">
                <img
                  src={
                    selectedPlaylist.image || "https://via.placeholder.com/150"
                  }
                  alt={selectedPlaylist.name}
                  className="w-36 h-36 mr-6 rounded-lg object-cover border-4 border-teal-400"
                />
                <div>
                  <h2 className="text-6xl font-bold text-white">
                    {selectedPlaylist.name}
                  </h2>
                  <p className="text-gray-400 text-lg mt-2">
                    {selectedPlaylist.songs?.length || 0}{" "}
                    {selectedPlaylist.songs?.length === 1 ? "song" : "songs"}
                  </p>
                </div>
              </div>
              {selectedPlaylist.songs && selectedPlaylist.songs.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedPlaylist.songs.map((song) => (
                    <div
                      key={song._id}
                      className="bg-[#262626] p-4 rounded-lg flex items-center justify-between shadow-md hover:bg-[#333333] transition-all duration-300 group relative"
                    >
                      <div className="flex items-center">
                        <img
                          src={song.image || "https://via.placeholder.com/50"}
                          alt={song.name}
                          className="w-12 h-12 rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="text-white text-lg font-semibold">
                            {song.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Added 5 days ago
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          deleteSongFromPlaylist(selectedPlaylist._id, song._id)
                        }
                        className="text-red-500 hover:text-red-400"
                      >
                        <TiDelete size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <ShowWhenNoThing title="Songs" maintitle="Playlist" />
              )}
            </div>
          ) : (
            <div className="grid gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => handlePlaylistClick(playlist)}
                  className="relative bg-[rgb(31,31,31)] rounded-lg p-6 cursor-pointer hover:bg-[#333333] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
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
                    <p className="text-gray-400 text-sm mb-1">
                      {playlist.songs.length} Songs
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(playlist._id);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                    >
                      <MdDeleteSweep size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Player songs={songs} />
    </div>
  );
};

export default PlaylistPage;
