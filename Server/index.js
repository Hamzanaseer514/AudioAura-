const express = require("express")
const {connectToDb} = require("./db")
const UserRouter = require("./Routes/User")
const AlbumRouter = require("./Routes/Album")
const path =  require("path")
const multer = require("multer")
const cors = require("cors")
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/",UserRouter)
app.use("/admin",AlbumRouter)


const storage = multer.diskStorage({
    destination: './Upload/Images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });
app.use('/images', express.static("Upload/Images"));
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
        success: true,
        image_url: `http://localhost:5173/images/${req.file.filename}`
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