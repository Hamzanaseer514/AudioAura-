import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import CategoryContext from "../context/CategoryContext";
import AlbumsContext from "../context/AlbumsContext";
import CircularHighlights from "./Highlights";
import AudioAuroLoader from "./AudioAuroLoader";

const DisplayHome = () => {
  const { category } = useContext(CategoryContext);
  const { albums, loading, songs, SongsLoading } = useContext(AlbumsContext);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Featu</span>red Cha<span className="text-[#00ABE4]">rts</span></h1>
        {loading ? (
          <AudioAuroLoader /> // Loader outside div
        ) : (
          <div className="flex overflow-auto">
            {albums.map((item) => (
              <AlbumItem
                key={item._id} // Use unique id instead of index
                albumid={item._id}
                name={item.name}
                desc={item.description}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Today's</span> Bigg<span className="text-[#00ABE4]">est H</span>it</h1>
        {SongsLoading ? (
          <AudioAuroLoader /> // Loader outside div
        ) : (
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
        )}
      </div>
      <div className="mb-4">
      <h1 className="my-5 font-extrabold text-2xl md:text-3xl lg:text-4xl"><span className="text-[#00ABE4]">Best</span> HighLig<span className="text-[#00ABE4]">hts</span></h1>
        <CircularHighlights />
      </div>
    </>
  );
};

export default DisplayHome;
