const Joi = require("joi");
const Songs = require("../Model/Song");
const { updateAlbumBySong } = require("./Album");

const Album = require("../Model/Album");


const addSong = async (req, res) => {
  try {
    const { name, image, file, description, duration, singer, albumId } = req.body;
    console.log(file)
    const existingSong = await Songs.findOne({ name, albumId });
    if (existingSong) {
      return res.status(400).json({success:false, message: "Song already exists in this album" });
    }

    const lastSong = await Songs.findOne().sort({ id: -1 });
    const id = lastSong ? lastSong.id + 1 : 1;

    const newSong = await Songs.create({
      id,
      name,
      image,
      file,
      description,
      duration,
      singer,
      albumId,
    });

    console.log(newSong._id);
    console.log(albumId);

    await updateAlbumBySong(newSong._id, albumId);

    res.status(201).json({success:true, message: "Song added successfully", song: newSong });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({success:false, message: "Error adding song", error });
  }
};

const getSongsByAlbumId = async (req, res) => {
  const { albumId } = req.params;

  try {
    const album = await Album.findById(albumId).populate('songs');

    if (!album) {
      return res.status(404).json({ success: false, message: "Album not found." });
    }

    const songs = album.songs;

    res.json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const getallsongs = async (req, res) => {
  try {
    const songs = await Songs.find();
    res.json({ success: true, songs });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch songs.' });
  }
}

const getSongsByPlaylist = async (req, res) => {
  const { songIds } = req.body;

  if (!songIds || songIds.length === 0) {
    return res.status(400).json({ message: 'No song IDs provided', success: false });
  }

  try {
    // Fetch songs from the database using the provided song IDs
    const songs = await Songs.find({ '_id': { $in: songIds } });

    if (!songs || songs.length === 0) {
      return res.status(404).json({ message: 'No songs found', success: false });
    }

    return res.json({ success: true, songs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching songs', success: false, error });
  }
}



module.exports = { addSong,getSongsByAlbumId,getallsongs,getSongsByPlaylist};
