const express = require('express');
const router = express.Router();
const {createPlaylist,getUsersPlaylist,addToPlaylist} = require('../Controller/Playlist');
const authMiddleware = require('../Middleware/fetchUser');
const {getSongsByPlaylist} = require("../Controller/Song")



router.post('/createplaylist',authMiddleware,createPlaylist)
router.get('/playlists',authMiddleware,getUsersPlaylist)
router.post('/addSongToPlaylist',addToPlaylist)
router.post('/getSongsByPlaylist',getSongsByPlaylist)




module.exports = router;