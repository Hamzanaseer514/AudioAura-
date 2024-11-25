import React, { createContext, useState, useEffect } from 'react';

const AlbumsContext = createContext();

export const AlbumsProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]); // State for songs
  const [loading, setLoading] = useState(true);
  const [SongLoading, setSongLoading] = useState(true);
  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getalbums');
        const data = await response.json();
        if (data.success) {
          setAlbums(data.albums); // Assuming the API returns albums in this format
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getallsongs');
        const data = await response.json();
        if (data.success) {
          // console.log("Fetched Songs:", data.songs); // Log fetched songs
          setSongs(data.songs); // Set songs state
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true); // Start loading
      setSongLoading(true);
      await fetchAlbums();
      await fetchSongs();
      setLoading(false); // End loading
      setSongLoading(false);
    };

    fetchData();
  }, []);

  // Log songs whenever they change
  useEffect(() => {
   
  }, [songs]);

  return (
    <AlbumsContext.Provider value={{ albums, songs, loading, SongLoading }}>
      {children}
    </AlbumsContext.Provider>
  );
};

export default AlbumsContext;
