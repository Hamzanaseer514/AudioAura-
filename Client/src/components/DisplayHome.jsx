// src/components/DisplayHome.js
import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import CategoryContext from "../context/CategoryContext";
import AlbumsContext from "../context/AlbumsContext";
import { songsData } from "../assets/assets";
import CircularHighlights from "./Highlights";

const DisplayHome = () => {
  const { category } = useContext(CategoryContext);
  const { albums, loading,songs } = useContext(AlbumsContext);
  console.log(songs)

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl  md:text-4xl">
          Featured Charts
        </h1>
        <div className="flex overflow-auto">
          {loading ? (
            <p>Loading albums...</p>
          ) : (
            albums.map((item) => (
              <AlbumItem
                key={item._id} // Use unique id instead of index
                albumid={item._id}
                name={item.name}
                desc={item.description}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
        <div className="flex overflow-auto">
          {songs.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              description={item.description}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <CircularHighlights />
      </div>
    </>
  );
};

export default DisplayHome;
