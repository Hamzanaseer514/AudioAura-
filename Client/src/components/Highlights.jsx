import React, { useState } from "react";

const highlightsData = [
  {
    id: 1,
    title: "Feel the Beat",
    image: "https://kpopping.com/documents/4c/0/Highlight-Switch-On-Concept-Photos-documents-3(1).jpeg?v=456a5",
    description: "Discover electrifying beats.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Mood Boosters",
    image: "https://kpopping.com/documents/4c/0/Highlight-Switch-On-Concept-Photos-documents-3(1).jpeg?v=456a5",
    description: "Playlists to uplift your mood.",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Acoustic Vibes",
    image: "https://kpopping.com/documents/4c/0/Highlight-Switch-On-Concept-Photos-documents-3(1).jpeg?v=456a5",
    description: "Soothing acoustic melodies.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Top Charts",
    image: "https://kpopping.com/documents/4c/0/Highlight-Switch-On-Concept-Photos-documents-3(1).jpeg?v=456a5",
    description: "Stay updated with trending tracks.",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
  
];

const MusicalHighlights = () => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
  };

  const closeModal = () => {
    setSelectedHighlight(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-3 pb-12">

      {/* Scrollable Container for Cards */}
      <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-thin scrollbar-thumb-[#ff4141]">
        {highlightsData.map((highlight) => (
          <div
            key={highlight.id}
            className="cursor-pointer rounded-xl shadow-lg transform transition-all hover:scale-105"
          >
            {/* Image */}
            <div className="relative overflow-hidden max-w-full">
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-60 h-60 object-cover transition-transform"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            {/* Title & Icon */}
            <div className="absolute bottom-4 left-4 text-white space-y-2">
              <h3 className="text-lg font-bold">{highlight.title}</h3>
              <div className="flex items-center gap-2">
                <button className="bg-[#ff4141] p-2 rounded-full hover:bg-[#ff6262]">
                  <i className="fas fa-play"></i>
                </button>
                <button
                  onClick={() => handleHighlightClick(highlight)}
                  className="bg-[#626262] p-2 rounded-full hover:bg-gray-500"
                >
                  <i className="fas fa-info"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Highlight */}
      {selectedHighlight && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
    <div className="relative bg-gradient-to-br from-[#1e2a47] via-[#3a4a75] to-[#1e2a47] rounded-xl p-8 shadow-xl max-w-3xl w-full">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-3xl font-bold text-white hover:text-gray-300"
      >
        ✖
      </button>
      <h2 className="text-3xl font-extrabold text-white mb-6">
        {selectedHighlight.title}
      </h2>
      <video
        src={selectedHighlight.video}
        controls
        autoPlay
        className="w-full h-64 rounded-lg mb-4 shadow-lg"
      />
      <p className="text-lg text-gray-300">{selectedHighlight.description}</p>
    </div>
  </div>
)}

    </div>
  );
};

export default MusicalHighlights;
