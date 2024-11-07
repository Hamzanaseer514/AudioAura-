import { useState, useEffect } from "react";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: {
            "token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        const { success, playlists } = data;
        if (success) {
          setPlaylists(playlists);
        } else {
          console.error("Failed to fetch playlists");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2a2a2a] to-[#121212] text-white py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-cyan-400 mb-20 tracking-wider">
        Your Playlists
      </h1>

      {loading ? (
        <div className="text-center text-xl text-gray-400">Loading...</div>
      ) : playlists.length === 0 ? (
        <div className="text-center text-xl text-gray-400">No playlists available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 relative"
            >
              {/* Circular Image with Overlap */}
              <div className="z-50 absolute top-[-43px] right-[-28px] w-24 h-24 rounded-full border-4 border-cyan-400 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
                  alt="Playlist"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 w-full rounded-tl-lg rounded-tr-lg"></div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-2">{playlist.name}</h2>
              <p className="text-gray-300 text-sm mb-6">{playlist.description}</p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-200">Songs:</h3>
                {playlist.songs.length > 0 ? (
                  <ul className="space-y-3">
                    {playlist.songs.map((song) => (
                      <li
                        key={song._id}
                        className="flex items-center justify-between text-gray-300 hover:text-cyan-400 transition duration-200 py-2 px-3 rounded-lg hover:bg-[#2a2a2a]"
                      >
                        <span className="truncate">{song.name}</span>
                        <button className="text-cyan-400 hover:text-cyan-500">
                          Play
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No songs in this playlist yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
