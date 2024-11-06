import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/Playercontext";
import AddToPlaylist from "./AddToPlaylist";

const Player = () => {
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
  const [volume, setVolume] = useState(1); // State for volume control, default at max (1)
  const [isMuted, setIsMuted] = useState(false); // Mute state
  const audioRef = useRef(null);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set volume on audio element
    }
  };

  // Mute/Unmute toggle
  const toggleMute = () => {
    if (isMuted) {
      setVolume(audioRef.current ? audioRef.current.volume : 1); // Restore previous volume
      setIsMuted(false);
    } else {
      setVolume(0); // Set volume to 0 for mute
      setIsMuted(true);
    }
  };

  // Fullscreen toggle for the player
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
    setIsAddToPlaylistOpen(true);
  };

  // Ensuring the volume is applied when the audio element is ready
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle heart functionality for liking songs
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
  const playlists = []; // Define this with your actual playlist data
  const song = {}; // Define this with your actual song data

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
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
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
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.TotalTime.minutes}:{time.TotalTime.seconds}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75 relative">
        {/* Tooltip and hover effect for icons */}
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
        {/* Download icon with hover effect */}
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

        {/* Add to playlist icon with hover text */}
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

        {/* Mute/Volume control section with hover text */}
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
          value={isMuted ? 0 : volume} // Sync volume with mute state
          onChange={handleVolumeChange}
          className="w-20 bg-slate-50 h-1 rounded"
        />
        <div className="relative group">
          <img
            className="w-4 cursor-pointer"
            src={assets.mini_player_icon}
            alt=""
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-7 left-0">
            Mini
          </div>
        </div>
        <div className="relative group">
          <img
            className={`w-4 cursor-pointer ${
              isFullscreen ? "opacity-50" : "opacity-150"
            }`}
            src={assets.zoom_icon}
            alt="zoom icon"
            onClick={toggleFullscreen}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bottom-8 left-[-25px]">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </div>
        </div>
      </div>

      {isAddToPlaylistOpen && (
        <AddToPlaylist
          setIsModalOpen={setIsAddToPlaylistOpen}
          playlists={playlists}
          song={{ ...song, track }}
        />
      )}

      {/* Audio Element */}
      <audio ref={audioRef} src={track.audio} autoPlay />
    </div>
  );
};

export default Player;
