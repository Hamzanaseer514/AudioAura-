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
import AdminAlbum from "./Pages/Admins/Pages/Albums"
import User from "./Pages/Admins/Pages/User"
import Playlist from "./Pages/Admins/Pages/Playlist"
import Track from "./Pages/Admins/Pages/Track"

const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
          <Route path="/admin/albums" element={<AdminAlbum />} />
          <Route path="/admin/user" element={<User/>}/>
          <Route path="/admin/playlist" element={<Playlist/>}/>
          <Route path="/admin/track" element={<Track/>}/>

      </Routes>
    </div>
  );
};
export default App;
