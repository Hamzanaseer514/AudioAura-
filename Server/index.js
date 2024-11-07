const express = require("express")
const {connectToDb} = require("./db")
const UserRouter = require("./Routes/User")
const AlbumRouter = require("./Routes/Album")
const playlistRouter = require("./Routes/Playlist")
const path =  require("path")
const multer = require("multer")
const cors = require("cors")
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/",UserRouter)
app.use("/admin",AlbumRouter)
app.use("/user",playlistRouter)


const storage = multer.diskStorage({
    destination: './Upload/AlbumImages',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/albumimages', express.static("Upload/AlbumImages"));
app.post("/uploadalbum", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/albumimages/${req.file.filename}`
    });
});


// #  UPLOAD FILES 

const storageAudio = multer.diskStorage({
    destination: './Upload/AudioFiles',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadAudio = multer({ storage: storageAudio });

app.use('/audiofiles', express.static("Upload/AudioFiles"));

app.post("/uploadaudio", uploadAudio.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        file_url: `http://localhost:${port}/audiofiles/${req.file.filename}`
    });
});


connectToDb().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Database not connected")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})