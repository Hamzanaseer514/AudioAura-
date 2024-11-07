const Playlist = require('../Model/Playlist');

const createPlaylist = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const userId = req.user.id;

    const newPlaylist = await Playlist.create({
      name,
      description,
      songs: [],
      status,
      user: userId,
    });

    res.status(201).json({playlist:newPlaylist,success:true, message: 'Playlist created successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Failed to create playlist', error,success:false });
  }
};

const getUsersPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await Playlist.find({ user: userId });
    if(!playlists){
      return res.status(404).json({ message: 'No playlist found for this user',success:false });
    }
    return res.json({playlists,success:true});
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch playlists', error });
  }
}

module.exports = {
  createPlaylist,
  getUsersPlaylist
};
