
import AlbumCover from "../assets/heroImg.jpg"; // Example album cover

const MusicGallery = () => {
  return (
    <section className="bg-black py-16 text-white">
      {/* Content Section */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Explore the Latest Hits
        </h2>
        <p className="text-lg md:text-xl">
          Dive into your favorite tracks and discover new music.
        </p>
      </div>

      {/* Music Gallery */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="group relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1682124918327-d3b6197efc43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwb3RpZnl8ZW58MHx8MHx8fDA%3D"
                alt={`Album ${index}`}
                className="w-full h-full object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 flex items-center justify-center text-center transition-opacity duration-300">
                <button className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicGallery;
