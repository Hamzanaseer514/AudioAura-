import React, { useState, useEffect } from "react";
import upload from "../../../assets/arrow.png"; // Placeholder image

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [songData, setSongData] = useState({
    name: '',
    singer: '',
    duration: '',
    albumId: '',
    image: '',
    file: '',
    description: '', // Added description field
  });
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getalbums');
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setAlbums(data.albums); // Assuming the response contains albums array
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const changeHandler = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const audioHandler = (e) => {
    setAudio(e.target.files[0]);
  };

  const addSongHandler = async (e) => {
    e.preventDefault();

    // Upload image
    let imageFormData = new FormData();
    imageFormData.append('image', image);

    try {
      const imageResponse = await fetch('http://localhost:3000/uploadalbum', {
        method: "POST",
        body: imageFormData,
      });

      const imageData = await imageResponse.json();
      console.log(imageData);
      songData.image = imageData.image_url; // Set the image URL

      // Upload audio
      let audioFormData = new FormData();
      audioFormData.append('file', audio);

      const audioResponse = await fetch('http://localhost:3000/uploadaudio', {
        method: "POST",
        body: audioFormData,
      });

      const audioData = await audioResponse.json();
      console.log(audioData);
      songData.file = audioData.file_url; // Set the audio file URL

      // Submit song data
      const response = await fetch('http://localhost:3000/admin/addsong', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });
      console.log(songData);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse.message);
        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      if (data.success) {
        alert("Song added successfully");
      } else {
        alert("Song addition failed");
      }
    } catch (error) {
      console.error("Error in addSongHandler:", error);
    }
  };

  return (
    <div className="w-auto max-w-[800px] md:w-[100%] mt-2 mx-auto">
      <div className="p-8 bg-slate-300 rounded-lg shadow-lg px-10 md:px-20">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Song</h2>
        <form onSubmit={addSongHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Song Name
            </label>
            <input
              value={songData.name}
              onChange={changeHandler}
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="singer" className="block text-sm font-medium text-gray-700">
              Singer
            </label>
            <input
              value={songData.singer}
              onChange={changeHandler}
              type="text"
              id="singer"
              name="singer"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              value={songData.duration}
              onChange={changeHandler}
              type="text"
              id="duration"
              name="duration"
              required
              placeholder="e.g., 3:45"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={songData.description}
              onChange={changeHandler}
              id="description"
              name="description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
              rows="3"
              placeholder="Enter song description"
            />
          </div>
          <div>
            <label htmlFor="albumId" className="block text-sm font-medium text-gray-700">
              Select Album
            </label>
            <select
              value={songData.albumId}
              onChange={changeHandler}
              id="albumId"
              name="albumId"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            >
              <option value="">Select an album</option>
              {albums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              <img className="w-20" src={image ? URL.createObjectURL(image) : upload} alt="" />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              id="image"
              name="image"
              required
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff4141] file:text-white hover:file:bg-[#626262]"
            />
          </div>
          <div>
            <label htmlFor="audio" className="block text-sm font-medium text-gray-700">
              Upload Audio
            </label>
            <input
              onChange={audioHandler}
              type="file"
              id="audio"
              name="audio"
              required
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff4141] file:text-white hover:file:bg-[#626262]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-r from-[#ff4141] to-[#626262] text-white font-semibold rounded-md shadow-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4141]"
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
