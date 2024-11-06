import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/Playercontext';

const Player = () => {
    const { track, seekBg, seekBar, playStatus, play, pause, time, previous, next, seeksong } = useContext(PlayerContext);

    // State to handle image toggle for the heart icon
    const [isHeartToggled, setIsHeartToggled] = useState(false);
    const [floatingHearts, setFloatingHearts] = useState([]); // State to manage floating hearts

    // State for download icon animation
    const [isDownloading, setIsDownloading] = useState(false);

    const toggleHeart = () => {
        setIsHeartToggled(!isHeartToggled);

        // Create multiple floating hearts with slightly different horizontal offsets
        const newHearts = Array.from({ length: 3 }).map((_, index) => ({
            id: Date.now() + index, // Unique ID for each heart
            offset: index * 100, // Slightly offset the animation start time for staggered effect
            leftOffset: (index - 1) * 10 // Adjust for slight horizontal movement (-10px, 0, +10px)
        }));

        setFloatingHearts(newHearts);

        // Clear floating hearts after animation duration
        setTimeout(() => {
            setFloatingHearts([]);
        }, 1000); // Match this to the animation duration
    };

    // Function to handle download icon animation
    const handleDownloadClick = () => {
        setIsDownloading(true); // Trigger the bounce animation
        setTimeout(() => {
            setIsDownloading(false); // Remove the animation after 1 second
        }, 1000); // Match animation duration
    };

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 relative'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4 '>
                    <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
                    {
                        playStatus ?
                            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
                            :
                            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minutes}:{time.currentTime.seconds}</p>
                    <div onClick={seeksong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.TotalTime.minutes}:{time.TotalTime.seconds}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75 relative'>
                {/* Toggle heart icon with animation */}
                <div className='relative'>
                    <img
                        className='w-5 cursor-pointer'
                        src={isHeartToggled ? assets.favorite_icon : assets.heart_icon}
                        alt="heart icon"
                        onClick={toggleHeart}
                    />
                    {/* Render floating hearts */}
                    {floatingHearts.map(heart => (
                        <img
                            key={heart.id}
                            className='absolute w-5 floating-heart'
                            style={{ 
                                animationDelay: `${heart.offset}ms`, // Stagger the animation
                                left: '-10%', // Start exactly over the original heart
                                transform: `translateX(${heart.leftOffset}px)`, // Slight horizontal shift
                                bottom: '100%', // Start at the position just above the original heart
                            }}
                            src={assets.heart_icon} // Use the same heart icon
                            alt="floating heart"
                        />
                    ))}
                </div>

                {/* Download icon with bounce animation */}
                <img
                    className={`w-5 cursor-pointer ${isDownloading ? 'animate-bounce' : ''}`}
                    src={assets.download_icon}
                    alt="download icon"
                    onClick={handleDownloadClick}
                />

                <img className='w-5 cursor-pointer' src={assets.plus_icon_playlist} alt="" />
                <img className='w-4 cursor-pointer' src={assets.queue_icon} alt="" />
                <img className='w-4 cursor-pointer' src={assets.volume_icon} alt="" />
                <div className='w-20 bg-slate-50 h-1 rounded'></div>
                <img className='w-4 cursor-pointer' src={assets.mini_player_icon} alt="" />
                <img className='w-4 cursor-pointer' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    );
};

export default Player;
