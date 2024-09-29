import React, { useContext,useEffect,useRef } from 'react'
import Navbar from './Navbar'
import { useParams,useLocation } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/Playercontext'


const DisplayAlbum = () => {
    const { id } = useParams()
    const albumData = albumsData[id];
    const {PlayWithId}=useContext(PlayerContext)

    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum?location.pathname.slice(-1):""; // Get the album ID from the URL
    const bgColor = isAlbum && albumsData[Number(albumId)] ? albumsData[Number(albumId)].bgColor : null;
  
    useEffect(() => {
      if (isAlbum && bgColor) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }, [bgColor, isAlbum]);
    
  return (

    <div ref={displayRef}  className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
    
    <Navbar />

    
    <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded'src={albumData.image} alt="" />
        <div className='flex flex-col'>
                <p>Playlist</p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                <h4>{albumData.desc}</h4>
                <p className='mt-1'>
                    <img className='inline-block w-5'src={assets.spotify_logo} alt="" />
                    <b className='mr-1 ml-1'>Spotify</b>
                    • 12,456,78 likes
                    • <b>50 songs, </b>
                    about 2 hr 30 min
                </p>
        </div>

    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p>
            <b className='mr-4'>#</b>
            Title
        </p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
    </div>
    <hr />
    {
        songsData.map((item,index) => (
            <div onClick={()=>PlayWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className='text-white'><b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                <img className='inline w-10 mr-5' src={item.image} alt="" />
                {item.name}
                </p>
                <p className='text-[15px]'>{albumData.name}</p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center'>{item.duration}</p>

            </div>
        ))
    }
    </div>

  )
}

export default DisplayAlbum


// import React from 'react'

// const DisplayAlbum = () => {
//   return (
//     <div style={{color: 'white'}}>DisplayAlbum</div>
//   )
// }

// export default DisplayAlbum