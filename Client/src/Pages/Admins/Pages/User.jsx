import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Navbar from "../components/Navbar"; // Import Navbar

const User = () => {
  const [activeOption, setActiveOption] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/getalluser");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredUsers = users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""
  );

  const deleteuser = async (id) => {
    const response = await fetch("http://localhost:3000/deleteuser", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    if (data.success) {
      alert(data.message);
      fetchUsers();
    } else if (!success) {
      alert(data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <Sidebar
            activeOption={activeOption}
            handleOptionClick={handleOptionClick}
          />
        </div>
        <div className="w-auto flex-1 lg:ml-60 mt-14 p-4 ">
          <h1 className="text-2xl font-bold text-center mt-6">User</h1>
          <div className="mb-6 mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search users..."
              className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="text-center">Loading users...</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-scroll">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-4 text-left">First Name</th>
                  <th className="p-4 text-left">Last Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Premium</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4">{user.firstname || "N/A"}</td>
                      <td className="p-4">{user.lastname || "N/A"}</td>
                      <td className="p-4">{user.email || "N/A"}</td>
                      <td className="p-4">{user.premium ? "Yes" : "No"}</td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            deleteuser(user._id);
                          }}
                          className="bg-red-500 text-white rounded px-2 py-1 transition duration-200 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
