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

const App = () => {
  const [category, setCategory] = useState('all'); 

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
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
          <Route path="/album" element={<Album />}/>
          <Route path="/song" element={<AddSong />}/>
        </Routes>
      </div>
    </CategoryContext.Provider>
  );
};

export default App;
