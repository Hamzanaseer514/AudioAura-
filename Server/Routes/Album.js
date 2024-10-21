const express = require('express');
const router = express.Router();
const { addAlbum,deleteAlbum,getalbums } = require("../Controller/Album"); 
const adminMiddleware = require("../Middleware/fetchAdmin"); 
const {addSong,getSongsByAlbumId,getallsongs} = require("../Controller/Song")

router.post('/addalbum',adminMiddleware,addAlbum);
router.delete('/deletealbum/:id', adminMiddleware, deleteAlbum);
router.get('/getalbums', getalbums);
router.post('/addsong', addSong);
router.get('/album/:albumId/songs', getSongsByAlbumId);
router.get('/getallsongs', getallsongs);

module.exports = router;
