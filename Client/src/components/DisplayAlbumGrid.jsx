// src/components/DisplayAlbum.js
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useLocation } from "react-router-dom";
import { PlayerContext } from "../context/Playercontext";
import AlbumsContext from "../context/AlbumsContext";

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/album/${albumId}/songs`
        ); // Update the URL as necessary
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
                  className="inline-block w-5"
                  src={"/path/to/spotify_logo.png"}
                  alt=""
                />
                <b className="mr-1 ml-1">Spotify</b> • {songs.length} songs
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
            <p className="text-center">ADD</p>
          </div>
          <hr />
          {songs.map((song, index) => (
            <div
              onClick={() => PlayWithId(song.id)}
              key={index}
              className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">
                  <img
                    src={song.image}
                    alt={song.name}
                    className="inline-block w-10 h-10 mr-2 rounded"
                  />
                </b>
                {song.name}
              </p>
              <p className="text-[15px]">{song.singer}</p>
              <p className="text-[15px] hidden sm:block">5 days ago</p>
              <p className="text-[15px] text-center">{song.duration}</p>
              <p className="text-[15px] text-center">add</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayAlbum;
