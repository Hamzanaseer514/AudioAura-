// src/components/DisplayHome.js
import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import CategoryContext from "../context/CategoryContext";
import AlbumsContext from "../context/AlbumsContext";
import { songsData } from "../assets/assets";

const DisplayHome = () => {
  const { category } = useContext(CategoryContext);
  const { albums, loading } = useContext(AlbumsContext);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
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
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
