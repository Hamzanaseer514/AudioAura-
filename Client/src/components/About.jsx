import React from 'react'
import HomePageNav from './HomePageNav'  // Import the HomePageNav component

const About = () => {
  return (
    <div className="bg-[#1A1A1A] text-white py-12 md:py-20 px-6 md:px-12 mt-16">
      {/* Add the HomePageNav component at the top */}
      <HomePageNav />

      {/* About Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white animate__animated animate__fadeIn animate__delay-1s">
          About Us
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mt-4">
          We are a passionate team of developers dedicated to bringing innovative and interactive music platforms to life. Our mission is to make your music experience unforgettable.
        </p>
      </section>

      {/* Team Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Developer 1 */}
        <div className="flex flex-col items-center text-center bg-[#262626] p-8 rounded-xl shadow-lg">
          <img
            src="https://via.placeholder.com/150" // Replace with developer 1 image
            alt="Developer 1"
            className="w-32 h-32 rounded-full mb-6"
          />
          <h3 className="text-2xl font-semibold text-[#00ABE4]">Muhammad Zubair</h3>
          <p className="text-gray-300 mt-2">
            Muhammad Zubair is a skilled full-stack developer with expertise in building interactive and dynamic web applications. With a strong background in both frontend and backend technologies, he creates seamless experiences for users.
          </p>
        </div>

        {/* Developer 2 */}
        <div className="flex flex-col items-center text-center bg-[#262626] p-8 rounded-xl shadow-lg">
          <img
            src="https://via.placeholder.com/150" // Replace with developer 2 image
            alt="Developer 2"
            className="w-32 h-32 rounded-full mb-6"
          />
          <h3 className="text-2xl font-semibold text-[#00ABE4]">Ameer Hamza</h3>
          <p className="text-gray-300 mt-2">
            Ameer Hamza is a talented developer specializing in backend services and API integrations. He ensures that the server-side of applications is robust and secure, providing a seamless user experience.
          </p>
        </div>
      </section>

      {/* Full About Description */}
      <section className="mt-16 bg-[#262626] p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] mb-4">Our Mission</h3>
        <p className="text-gray-300 text-lg md:text-xl">
          We are a team of passionate developers who believe in the power of technology to bring people closer to their favorite music. Our mission is to create innovative and engaging platforms that allow users to enjoy a seamless and personalized music experience. With a focus on performance, security, and user experience, we strive to build music platforms that are not only functional but also a delight to use.
        </p>
        <p className="text-gray-300 text-lg md:text-xl mt-6">
          Our platform leverages the latest web technologies to offer users an intuitive interface, fast performance, and seamless interaction. Whether you’re discovering new music, creating playlists, or simply enjoying your favorite tracks, we’re here to enhance your musical journey.
        </p>
      </section>
    </div>
  )
}

export default About
