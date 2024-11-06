import React, { useState } from 'react';

const ProfilePage = () => {
  // Sample user data
  const initialUserData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "", // Password field, typically wouldn't display this
    createdAt: "2024-01-01" // Example creation date
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialUserData.firstName,
    lastName: initialUserData.lastName,
    email: initialUserData.email,
    password: "", // Password field for editing
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: "", // Clear password field when editing
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
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-cyan-400 text-gray-900 rounded-lg font-bold hover:bg-cyan-300 transition duration-200">
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">First Name: {userData.firstName}</h2>
            <h2 className="text-xl font-semibold">Last Name: {userData.lastName}</h2>
            <p className="text-gray-400">Email: {userData.email}</p>
            <p className="text-gray-400">Created At: {userData.createdAt}</p>
            <button onClick={handleEditClick} className="mt-4 w-full py-2 px-4 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-300 transition duration-200">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
