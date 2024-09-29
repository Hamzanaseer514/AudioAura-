import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleGoBack = () => {
    // navigate(-2);
  };

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-white overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #ff6b6b 0%, #f06595 50%, #845ec2 100%)", // Original gradient colors
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          403 - Unauthorized Access
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Sorry, you don't have permission to view this page.
        </p>
        <p className="text-md md:text-lg mb-8">
          Please contact the administrator or go back to the homepage.
        </p>
        <Link to="/"
        >
        <button
          onClick={handleGoBack}
          className="bg-green-600 text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300"
        >
          Go Back
        </button>
        </Link>
      </div>

      {/* Sad Faces Spread Around */}
      <section className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Left Side Emojis */}
        <div className="absolute top-10 left-12 animate-bounce">
          <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center">
            <span className="text-3xl">😔</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-8 animate-ping delay-200">
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
            <span className="text-4xl">😢</span>
          </div>
        </div>

        {/* Right Side Emojis */}
        <div className="absolute bottom-16 right-20 animate-pulse delay-500">
          <div className="bg-purple-600 w-18 h-18 rounded-full flex items-center justify-center">
            <span className="text-5xl">😭</span>
          </div>
        </div>
        <div className="absolute top-24 right-28 animate-bounce delay-700">
          <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
            <span className="text-2xl">😩</span>
          </div>
        </div>

        {/* Top and Bottom Emojis */}
        <div className="absolute top-12 right-40 animate-pulse">
          <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="text-xl">☹️</span>
          </div>
        </div>
        <div className="absolute bottom-28 left-32 animate-bounce">
          <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center">
            <span className="text-3xl">😟</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UnauthorizedPage;
