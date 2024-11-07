const express = require('express');
const router = express.Router();
const {createPlaylist,getUsersPlaylist} = require('../Controller/Playlist');
const authMiddleware = require('../Middleware/fetchUser');



router.post('/createplaylist',authMiddleware,createPlaylist)
router.get('/playlists',authMiddleware,getUsersPlaylist)




module.exports = router;