const express = require('express');
const router = express.Router();
const { addAlbum,deleteAlbum } = require("../Controller/Album"); 
const adminMiddleware = require("../Middleware/fetchAdmin"); 

router.post('/addalbum',adminMiddleware,addAlbum);
router.delete('/deletealbum/:id', adminMiddleware, deleteAlbum);

module.exports = router;
