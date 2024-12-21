import React from 'react'
import HomePageNav from './HomePageNav'  
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();  
  return (
    <div className="bg-[#1A1A1A] text-white py-12 md:py-20 px-6 md:px-12 mt-16">
      <HomePageNav />

      {/* About Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white animate__animated animate__fadeIn animate__delay-0.5s">
          About Us
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mt-4">
          We are a passionate team of developers dedicated to bringing innovative and interactive music platforms to life. Our mission is to make your music experience unforgettable.
        </p>
      </section>

      {/* Team Section */}
      <section className="grid grid-cols-1 md:grid-cols-1 gap-12">
        {/* Developer 1 */}
        <div className="flex flex-col items-center text-center bg-[#262626] p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src={assets.my_pic} 
            alt="Developer 1"
            className="w-32 h-32 rounded-full mb-6 transition-all duration-300 hover:opacity-80"
          />
          <h3 className="text-2xl font-semibold text-[#00ABE4]">Muhammad Zubair</h3>
          <p className="text-gray-300 mt-2">
            Muhammad Zubair is a skilled full-stack developer with expertise in building interactive and dynamic web applications. With a strong background in both frontend and backend technologies, he creates seamless experiences for users.
          </p>
        </div>

        {/* Developer 2 */}
        {/* <div className="flex flex-col items-center text-center bg-[#262626] p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src={assets.Hamza_pic} 
            alt="Developer 2"
            className="w-32 h-32 rounded-full mb-6 transition-all duration-300 hover:opacity-80"
          />
          <h3 className="text-2xl font-semibold text-[#00ABE4]">Ameer Hamza</h3>
          <p className="text-gray-300 mt-2">
            Ameer Hamza is a talented developer specializing in backend services and API integrations. He ensures that the server-side of applications is robust and secure, providing a seamless user experience.
          </p>
        </div> */}
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

      {/* Skills Section */}
      <section className="mt-16 text-center">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] mb-8">Our Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-[#262626] p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Frontend Development</h4>
            <p className="text-gray-300">
              We specialize in building responsive, user-friendly interfaces with modern web technologies like React, HTML5, CSS3, and Tailwind CSS.
            </p>
          </div>
          <div className="bg-[#262626] p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Backend Development</h4>
            <p className="text-gray-300">
              We create secure and scalable server-side solutions with Node.js, Express, and APIs that are designed for optimal performance.
            </p>
          </div>
          <div className="bg-[#262626] p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Database Management</h4>
            <p className="text-gray-300">
              Our team excels in managing relational and NoSQL databases, ensuring smooth data handling and high availability.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mt-16 text-center bg-[#333333] p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] mb-8">Tech Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-[#262626] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Frontend</h4>
            <p className="text-gray-300">React, HTML5, CSS3, Tailwind CSS</p>
          </div>
          <div className="bg-[#262626] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Backend</h4>
            <p className="text-gray-300">Node.js, Express, MongoDB</p>
          </div>
          <div className="bg-[#262626] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Version Control</h4>
            <p className="text-gray-300">Git, GitHub</p>
          </div>
        </div>
      </section>

      {/* Vision and Values Section */}
      <section className="mt-16">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] text-center mb-8">Our Vision and Values</h3>
        <div className="text-center bg-[#262626] p-8 rounded-xl shadow-lg">
          <p className="text-gray-300 text-lg md:text-xl">
            Our vision is to build innovative and user-centric platforms that revolutionize the music industry. We value creativity, collaboration, and continuous learning to push boundaries in the tech space.
          </p>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="mt-16 bg-[#262626] p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] text-center mb-8">Our Partnerships</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-[#333333] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">MusicStream Inc.</h4>
            <p className="text-gray-300">We partnered with MusicStream to integrate their streaming API for an enhanced music experience.</p>
          </div>
          <div className="bg-[#333333] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Tech Labs</h4>
            <p className="text-gray-300">A strategic partnership with Tech Labs to optimize our backend performance and scalability.</p>
          </div>
          <div className="bg-[#333333] p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-[#00ABE4] mb-4">Cloud Innovators</h4>
            <p className="text-gray-300">Collaborating with Cloud Innovators for secure cloud hosting and database management.</p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mt-16 bg-[#333333] p-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-[#00ABE4]">How do I get started?</h4>
            <p className="text-gray-300">Simply sign up, create your profile, and start exploring your favorite music.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#00ABE4]">Can I create playlists?</h4>
            <p className="text-gray-300">Yes! You can create custom playlists to organize your music the way you like.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-16 bg-[#262626] p-8 rounded-xl shadow-lg text-center">
        <h3 className="text-3xl font-extrabold text-[#00ABE4] mb-8">Contact Us</h3>
        <p className="text-gray-300 mb-6">Have any questions or want to get in touch? Reach out to us!</p>
        <button className="bg-[#00ABE4] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#008CBA] transition duration-300
        " onClick={()=>{navigate('/contact')}}>
          Get In Touch
        </button>
      </section>
    </div>
  )
}

export default About;
