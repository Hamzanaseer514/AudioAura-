import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/Playercontext";
import AddToPlaylist from "./AddToPlaylist";
import SongContext from "../context/SongContext";
import { FaHeart, FaList, FaDownload } from 'react-icons/fa';



const Player = () => {

  const {setSong} = useContext(SongContext)
  const {
    track,
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seeksong,
  } = useContext(PlayerContext);

  const [isHeartToggled, setIsHeartToggled] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  const audioRef = useRef(null);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(audioRef.current ? audioRef.current.volume : 1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message}`
          );
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const openmodel = () => {
    setSong(track);
    setIsAddToPlaylistOpen(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleHeart = () => {
    setIsHeartToggled(!isHeartToggled);

    const newHearts = Array.from({ length: 3 }).map((_, index) => ({
      id: Date.now() + index,
      offset: index * 100,
    }));

    setFloatingHearts(newHearts);

    setTimeout(() => {
      setFloatingHearts([]);
    }, 1000);
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4 relative">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />
          <div className="hidden md:block">
            <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
          </div>
          <div className="lg:hidden block ">
            <img
              className="w-5 cursor-pointer"
              src={assets.player_more}
              alt=""
              onClick={toggleMenu} // Add onClick handler for toggling menu
            />
            {isMenuOpen && (
       <div className="absolute bg-black bg-opacity-80 text-white p-4 rounded-lg right-0 mt-[-180px] mr-[70px] shadow-lg">
              <p
                className="cursor-pointer py-2 px-4 flex items-center gap-2 hover:bg-gray-700 rounded transition-all duration-200"
                onClick={toggleHeart}
              >
                <FaHeart className="text-red-500" /> Add to Favourite
              </p>
              <p
                className="cursor-pointer py-2 px-4 flex items-center gap-2 hover:bg-gray-700 rounded transition-all duration-200"
                onClick={openmodel} // Opens the Add to Playlist modal
              >
                <FaList className="text-blue-500" /> Add to Playlist
              </p>
              <p className="cursor-pointer py-2 px-4 flex items-center gap-2 hover:bg-gray-700 rounded transition-all duration-200">
                <FaDownload className="text-green-500" /> Download Song
              </p>
            </div>
     

            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minutes}:{time.currentTime.seconds}
          </p>
          <div
            onClick={seeksong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-[#00ABE4] rounded-full"
            />
          </div>
          <p>
            {time.TotalTime.minutes}:{time.TotalTime.seconds}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75 relative">
        {/* Rest of the code for controls and icons */}
        <div className="relative group">
          <img
            className="w-5 cursor-pointer"
            src={isHeartToggled ? assets.favorite_icon : assets.heart_icon}
            alt="heart icon"
            onClick={toggleHeart}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-8 left-0">
            Favorite
          </div>
        </div>
        {floatingHearts.map((heart) => (
          <img
            key={heart.id}
            className="absolute w-5 floating-heart"
            style={{
              animationDelay: `${heart.offset}ms`,
              left: "0",
              bottom: "100%",
            }}
            src={assets.heart_icon}
            alt="floating heart"
          />
        ))}
        <div className="relative group">
          <img
            className="w-5 cursor-pointer"
            src={assets.download_icon}
            alt="download icon"
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-8 left-0">
            Download
          </div>
        </div>

        <div className="relative group">
          <img
            onClick={openmodel}
            className="w-5 cursor-pointer"
            src={assets.plus_icon_playlist}
            alt="add to playlist"
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-7 left-0">
            Playlist
          </div>
        </div>
        <div className=" relative group">
          <img className="w-4 cursor-pointer" src={assets.queue_icon} alt="" />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-7 left-0">
            Queue
          </div>
        </div>

        <div className="relative group">
          <img
            className={`w-4 cursor-pointer ${isMuted ? "w-5" : "w-4"}`}
            src={isMuted ? assets.mute_icon : assets.volume_icon}
            alt="volume icon"
            onClick={toggleMute}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-8 left-0">
            {isMuted ? "Unmute" : "Mute"}
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 bg-slate-50 h-1 rounded"
        />
        <div className="relative group">
          <img
            className="w-4 cursor-pointer"
            src={assets.mini_player_icon}
            alt="minimize player icon"
            onClick={toggleFullscreen}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-8 left-[-35px]">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </div>
        </div>
      </div>

      {/* AddToPlaylist Modal */}
      {isAddToPlaylistOpen && (
        <AddToPlaylist
          setIsModalOpen={setIsAddToPlaylistOpen}
          // You can pass other props like playlists or song if needed here
          // song={{ ...song, track }}
        />
      )}

      {/* Audio Element */}
      <audio ref={audioRef} src={track.audio} autoPlay />
    </div>
  );
};

export default Player;
