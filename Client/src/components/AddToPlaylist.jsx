import { useState } from "react";

const AddToPlaylist = ({ setIsModalOpen, playlists, song }) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists((prevSelected) => {
      if (prevSelected.includes(playlistId)) {
        return prevSelected.filter((id) => id !== playlistId);
      } else {
        return [...prevSelected, playlistId]; 
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Playlists:", selectedPlaylists);
    console.log("Song to Add:", song);
    setIsModalOpen(false);
    resetSelection();
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    resetSelection(); 
  };

  const resetSelection = () => {
    setSelectedPlaylists([]); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#121212] text-white rounded-lg shadow-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-cyan-400"
        >
          &#x2715;
        </button>
        <h2 className="text-3xl font-extrabold text-center text-cyan-400 mb-6">
          Add to Playlist
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-300">
              Select Playlists to Add "{song.title}" to:
            </p>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`playlist-${playlist.id}`}
                    checked={selectedPlaylists.includes(playlist.id)}
                    onChange={() => handleCheckboxChange(playlist.id)}
                    className="mr-2 h-4 w-4 text-cyan-400 border-gray-600 rounded focus:ring-cyan-400"
                  />
                  <label
                    htmlFor={`playlist-${playlist.id}`}
                    className="text-sm text-gray-200"
                  >
                    {playlist.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-cyan-400 text-gray-900 rounded-lg font-bold hover:bg-cyan-300 transition duration-200"
          >
            Add to Selected Playlists
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
