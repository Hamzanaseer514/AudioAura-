import React from 'react'
import HomePageNav from './HomePageNav'  // Import HomePageNav component


const Contact = () => {
  return (
    <div>
      {/* Add the HomePageNav at the top */}
      <HomePageNav />

      <section className="bg-[#1A1A1A] py-12 md:py-20 px-6 md:px-12 mt-12 md:mt-14">
  <div className="text-center space-y-8">
    <h2 className="text-3xl md:text-5xl font-extrabold text-white animate__animated animate__fadeIn animate__delay-0.1s">
      Get In Touch With Us
    </h2>
    <p className="text-gray-300 text-lg md:text-xl">
      Have any <span className="text-[#00ABE4]">questions</span> or <span className="text-[#00ABE4]">feedback</span>? We’d love to hear from you!
    </p>
  </div>
  
  <div className="max-w-4xl mx-auto mt-12 bg-[#262626] p-8 rounded-xl shadow-lg">
    <form action="#" method="POST" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-300">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Enter your name" 
            className="w-full p-4 rounded-xl bg-[#333333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ABE4] placeholder-gray-500"
            required 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-300">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            className="w-full p-4 rounded-xl bg-[#333333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ABE4] placeholder-gray-500"
            required 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-gray-300">Message</label>
        <textarea 
          id="message" 
          name="message" 
          placeholder="Your message here..." 
          rows="6"
          className="w-full p-4 rounded-xl bg-[#333333] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ABE4] placeholder-gray-500"
          required 
          style={{ resize: 'none' }} // Ensuring no resizing
          aria-label="Your message"
        />
      </div>

      <div className="text-center">
        <button 
          type="submit" 
          className="bg-[#00ABE4] text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:bg-[#009fc3]">
          Send Message
        </button>
      </div>
    </form>
  </div>
</section>

    </div>
  )
}

export default Contact
