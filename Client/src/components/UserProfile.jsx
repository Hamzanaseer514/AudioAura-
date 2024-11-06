import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  const navigate = useNavigate(); // Initialize navigate

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

  // Function to navigate back to the previous page or a specific page
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page (back)
    // or, if you want to go to a specific page like the Spotify page:
    // navigate('/spotify'); 
  };

  return (
    <div className="h-screen bg-[#1212] flex justify-center items-center">
      {/* Profile container */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-scroll   w-full h-full"> 
        
        {/* Sidebar for profile picture and name */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col items-center justify-center p-8 h-full">
          <div className="rounded-full h-24 w-24 bg-white flex items-center justify-center mb-4">
            {/* Placeholder for profile picture */}
            <span className="text-2xl font-bold text-gray-800">
              {userData.firstName[0]}{userData.lastName[0]}
            </span>
          </div>
          <h2 className="text-xl font-semibold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-sm mt-1">{userData.email}</p>
          <p className="text-xs mt-2">Member since {userData.createdAt}</p>
          
          {/* Fixed counts for Playlists and Favorites */}
          <div className="mt-4 text-white">
            <p className="text-sm">Playlists: {userData.playlistsCount}</p>
            <p className="text-sm">Favorites: {userData.favoritesCount}</p>
          </div>
        </div>

        {/* Profile info and edit form */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-between h-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Profile Information</h2>

          {/* Back Button */}
          <button
            onClick={handleBackClick} // Calls handleBackClick when clicked
            className="mb-4 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Back to Spotify
          </button>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition duration-200"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-10">
              <p className="text-lg font-semibold text-gray-600 ">First Name: {userData.firstName}</p>
              <p className="text-lg font-semibold text-gray-600">Last Name: {userData.lastName}</p>
              <p className="text-lg font-semibold text-gray-600">Email: {userData.email}</p>
              <p className="text-lg font-semibold text-gray-600">Joined: {userData.createdAt}</p>
              
              {/* Display the count of Playlists and Favorites */}
              <p className="text-lg font-semibold text-gray-600">Playlists: {userData.playlistsCount}</p>
              <p className="text-lg font-semibold text-gray-600">Favorites: {userData.favoritesCount}</p>

              <button
                onClick={handleEditClick}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
