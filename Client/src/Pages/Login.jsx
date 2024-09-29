import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const { msg, success, token, role } = data;
      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        alert(msg);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/spotify");
        }
      } else {
        alert(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
      <div className="bg-[#181818] shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center">Login to Spotify</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1DB954] hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link to="/signup" className="text-[#1DB954] font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
