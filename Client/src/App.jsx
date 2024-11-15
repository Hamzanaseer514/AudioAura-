import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Users/Home";
import MainPage from "./Pages/Users/MainPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Premium from "./components/Premium";
import ShowAlbum from "./components/ShowAlbum";
import AdminMain from "./Pages/Admins/AdminMain";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./components/UnAuthorized";
import CategoryContext from "./context/CategoryContext";
import { useState } from "react";
import Album from "./Pages/Admins/Pages/Albums";
import AddSong from "./Pages/Admins/Pages/AddSongs";
import { AlbumsProvider } from "./context/AlbumsContext";
import PlayerContextProvider from "./context/Playercontext.jsx";
import Playlist from "./Pages/Admins/Pages/Playlist.jsx";
import User from "./Pages/Admins/Pages/User.jsx";
import CreatePlaylist from "./components/CreatePlaylist.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UserPlaylist from "./components/UserPlaylists.jsx";
import UserFavourite from "./components/UserFavourite.jsx";

const App = () => {
  const [category, setCategory] = useState("all");
  const [Song, setSong] = useState(null);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      <AlbumsProvider> {/* Wrap with AlbumsProvider */}
      <PlayerContextProvider>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-playlist" element={<UserPlaylist />} />
            <Route path="/user-favourite" element={<UserFavourite/>} />
            <Route
              path="/spotify"
              element={
                <ProtectedRoute requiredRole="user">
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route path="/spotify/premium" element={<Premium />} />
            <Route path="/spotify/album/:id" element={<ShowAlbum />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminMain />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/albums" element={<Album />} />
            <Route path="/songs" element={<AddSong />} />
            <Route path="/playlists" element={<Playlist />} />
            <Route path="/users" element={<User />} />
          </Routes>
         
        </div>
        </PlayerContextProvider>
      </AlbumsProvider>
    </CategoryContext.Provider>
  );
};

export default App;
