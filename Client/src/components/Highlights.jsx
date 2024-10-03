import React, { useState } from 'react';

const highlightsData = [
  {
    id: 1,
    title: 'Highlight 1',
    image: 'https://via.placeholder.com/150', // Replace with your image URL
    description: 'Description for highlight 1.',
  },
  {
    id: 2,
    title: 'Highlight 2',
    image: 'https://via.placeholder.com/150', // Replace with your image URL
    description: 'Description for highlight 2.',
  },
  {
    id: 3,
    title: 'Highlight 3',
    image: 'https://via.placeholder.com/150', // Replace with your image URL
    description: 'Description for highlight 3.',
  },
  {
    id: 4,
    title: 'Highlight 4',
    image: 'https://via.placeholder.com/150', // Replace with your image URL
    description: 'Description for highlight 4.',
  },
  // Add more highlights as needed
];

const CircularHighlights = () => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
  };

  const closeHighlight = () => {
    setSelectedHighlight(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Highlights</h1>
      <div className="flex overflow-x-auto justify-center gap-4 mb-6">
        {highlightsData.map((highlight) => (
          <div
            key={highlight.id}
            className="cursor-pointer w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-gray-300 hover:scale-105 transition-transform"
            onClick={() => handleHighlightClick(highlight)}
          >
            <img
              src={highlight.image}
              alt={highlight.title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Display selected highlight */}
      {selectedHighlight && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full md:w-1/2 p-4">
            <button onClick={closeHighlight} className="absolute top-4 right-4 text-black">
              ✖
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedHighlight.title}</h2>
            <img
              src={selectedHighlight.image}
              alt={selectedHighlight.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-gray-700">{selectedHighlight.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularHighlights;
