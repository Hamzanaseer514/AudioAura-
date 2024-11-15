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

const addToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found', success: false });
    }
    playlist.songs.push("671387fb455756f7c50c2540");
    await playlist.save();
    return res.json({ playlist, success: true, message: "Song added to playlist successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add song to playlist', error });
  }
};





module.exports = {
  createPlaylist,
  getUsersPlaylist,
  addToPlaylist
};
