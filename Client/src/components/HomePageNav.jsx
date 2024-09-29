import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setIsLoading(true); // Set loading to true
    setTimeout(() => {
      localStorage.removeItem("token"); 
      setIsLoggedIn(false);
      navigate("/"); // Redirect after 5 seconds
    }, 3000); // 5 seconds delay
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <h1 className="text-green-500 text-5xl">SPOTIFY</h1>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/spotify" className="text-white hover:text-gray-300">
            Features
          </Link>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300"
            >
              {isLoading ? "Logging out..." : "Logout"} {/* Change button text */}
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 mt-4 text-center">
          <Link to="/spotify" className="text-white hover:text-gray-300">
            Features
          </Link>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
