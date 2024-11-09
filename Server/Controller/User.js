const { useState, useEffect } = require("react");
import { useNavigate } from "react-router-dom"; // React Router's useNavigate hook for redirection
import Sidebar from "../components/sidebar";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: { "token": token }
        });
        
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setPlaylists(data.playlists);
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
  }, [navigate]);

  return (
    <div>
        
    </div>
  );
};

export default PlaylistPage;
