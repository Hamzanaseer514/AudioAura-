import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar"; // Import Sidebar component
import Navbar from "./Navbar"; // Import Navbar component

const ProfilePage = () => {
  const initialUserData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "",
    createdAt: "2024-01-01",
    playlistsCount: 5, // Fixed number of playlists
    favoritesCount: 12, // Fixed number of favorites
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialUserData.firstName,
    lastName: initialUserData.lastName,
    email: initialUserData.email,
    password: "",
  });

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prevData) => ({
      ...prevData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    }));
    setIsEditing(false);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex">
        <Sidebar /> {/* Sidebar component */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Navbar /> {/* Navbar component */}

          {/* Profile container */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl mt-8">
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
              {/* Profile Section */}
              <div className="w-full md:w-1/3 text-center text-white flex flex-col items-center justify-center">
                <div className="rounded-full w-32 h-32 bg-teal-400 mx-auto mb-6 flex items-center justify-center">
                  {/* Placeholder for profile picture */}
                  <span className="text-3xl font-bold text-gray-800">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-sm">{userData.email}</p>
                <p className="text-xs mt-2">Member since {userData.createdAt}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Playlists: {userData.playlistsCount}</p>
                  <p>Favorites: {userData.favoritesCount}</p>
                </div>
              </div>

              {/* Profile Form Section */}
              <div className="w-full md:w-2/3 space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Profile Information</h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-500 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5 text-white">
                    <p className="text-lg">First Name: {userData.firstName}</p>
                    <p className="text-lg">Last Name: {userData.lastName}</p>
                    <p className="text-lg">Email: {userData.email}</p>
                    {/* <p className="text-lg">Joined: {userData.createdAt}</p>
                    <p className="text-lg">Playlists: {userData.playlistsCount}</p>
                    <p className="text-lg">Favorites: {userData.favoritesCount}</p> */}

                    <button
                      onClick={handleEditClick}
                      className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-200"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
