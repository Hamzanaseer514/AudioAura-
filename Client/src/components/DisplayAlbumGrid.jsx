import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useLocation } from "react-router-dom";
import { PlayerContext } from "../context/Playercontext";
import AlbumsContext from "../context/AlbumsContext";
import { FaRegHeart, FaEllipsisV } from "react-icons/fa";
import AudioAuraLogo from "../assets/AudioAuraLogo.png"

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albums, loading } = useContext(AlbumsContext);
  const { PlayWithId } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const albumData = albums.find((album) => album._id === albumId);
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [showMenu, setShowMenu] = useState(null); // To handle menu visibility for each song

  // Fetch the user's favorites when they log in
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.id) {
          try {
            const response = await fetch(
              `http://localhost:3000/user/favorites`,
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );
            const data = await response.json();
            console.log("data", data);
            if (data.success) {
              // Populate the likedSongs state with the favorite song IDs
              setLikedSongs(new Set(data.favoriteSongIds));
            }
          } catch (error) {
            console.error("Error fetching user favorites:", error);
          }
        }
      }
    };

    fetchFavorites();
  }, []);

  // Function to decode the JWT and extract userId
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split(" ")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const handleLikeClick = async (songId) => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.id) {
      console.log("User not logged in");
      return;
    }

    const userId = decodedToken.id; // Extract userId from the decoded token

    try {
      const response = await fetch("http://localhost:3000/user/addfavourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId, // Send userId extracted from token
          songId, // Send the songId
        }),
      });

      const data = await response.json();
      if (data.success) {
        setLikedSongs((prevLikedSongs) => {
          const updatedLikedSongs = new Set(prevLikedSongs);
          updatedLikedSongs.add(songId); // Add song to liked songs
          return updatedLikedSongs;
        });
        console.log("Song added to favorites");
      } else {
        console.log(data.message); // Handle error message
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Fetch songs for the album
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/album/${albumId}/songs`
        );
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoadingSongs(false);
      }
    };

    if (isAlbum && albumData) {
      fetchSongs();
      displayRef.current.style.background = `linear-gradient(${albumData.bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [albumData, isAlbum, albumId]);

  const handleMenuToggle = (songId, e) => {
    e.stopPropagation(); // Prevent event from bubbling up and closing the menu immediately
    setShowMenu((prev) => (prev === songId ? null : songId)); // Toggle menu visibility
  };

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Navbar />
      {loading || loadingSongs || !albumData ? (
        <p>Loading album...</p>
      ) : (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <img className="w-48 rounded" src={albumData.image} alt="" />
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {albumData.name}
              </h2>
              <h4>{albumData.description}</h4>
              <p className="mt-1">
                <img
                  className="inline-block w-20"
                  src={AudioAuraLogo}
                  alt="Spotify"
                />
                <b className="mr-1 ml-1">Audio Aura</b> • {songs.length} songs
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p>
              <b className="mr-4">#</b> Title
            </p>
            <p>Singer</p>
            <p className="hidden sm:block">Date Added</p>
            <p className="text-center">Duration</p>
            <p className="">ADD</p>
          </div>
          <hr />
          {songs.map((song, index) => (
            <div
              onClick={() => PlayWithId(song.id)}
              key={index}
              className="relative group grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">
                  <img
                    src="http://localhost:3000/albumimages/image_1729333298901.jpg"
                    // src={song.image}
                    alt={song.name}
                    className="inline-block w-10 h-10 mr-2 rounded"
                  />
                </b>
                {song.name}
              </p>

              <p className="text-[15px]">{song.singer}</p>

              <p className="text-[15px] hidden sm:block">7 days ago</p>

              <p className="text-[15px] text-center">{song.duration}</p>

              <p
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick(song._id);
                }}
                className={`cursor-pointer w-8 ${
                  likedSongs.has(song._id)
                    ? "bg-[#00ABE4] text-white"
                    : "bg-transparent text-[#a7a7a7]"
                } p-2 rounded-full transition-all duration-300`}
              >
                <FaRegHeart />
              </p>

              <div className="absolute hidden group-hover:block top-1/2 right-2 transform -translate-y-1/2 w-4">
                <FaEllipsisV
                  onClick={(e) => handleMenuToggle(song._id, e)} // Pass the event here
                  className="text-[#a7a7a7] cursor-pointer"
                />
                {showMenu === song._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] rounded-lg shadow-lg">
                    <ul>
                      <li
                        className="text-white p-2 hover:bg-[#333333] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Add to Playlist
                      </li>
                      <li
                        className="text-white p-2 hover:bg-[#333333] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Create Playlist
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayAlbum;
