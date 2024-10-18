const express = require('express');
const router = express.Router();
const { addAlbum,deleteAlbum,getalbums } = require("../Controller/Album"); 
const adminMiddleware = require("../Middleware/fetchAdmin"); 
const {addSong} = require("../Controller/Song")

router.post('/addalbum',adminMiddleware,addAlbum);
router.delete('/deletealbum/:id', adminMiddleware, deleteAlbum);
router.get('/getalbums', getalbums);
router.get('/addsong', addSong);

module.exports = router;
