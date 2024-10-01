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
      </Routes>
    </div>
  );
};
export default App;
