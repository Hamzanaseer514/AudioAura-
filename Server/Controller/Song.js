const Joi = require("joi");
const Song = require("../Model/Song");
const { updateAlbumBySong } = require("./Album");

const addSong = async (req, res) => {
    const songSchema = Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.string().uri().required(),
      file: Joi.string().uri().required(),
      description: Joi.string().min(10).required(),
      duration: Joi.string().required(),
      singer: Joi.string().required(),
      albumId: Joi.string().required(),
    });
  
    try {
      const { error } = songSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
      }
  
      const { name, image, file, description, duration, singer, albumId } = req.body;
  
      const existingSong = await Song.findOne({ name, albumId });
      if (existingSong) {
        return res.status(400).json({ message: "Song already exists in this album" });
      }
  
      const lastSong = await Song.findOne().sort({ id: -1 });
      const id = lastSong ? lastSong.id + 1 : 1;
  
      const newSong = await Song.create({
        id,
        name,
        image,
        file,
        description,
        duration,
        singer,
        albumId,
      });
  
      await updateAlbumBySong(newSong._id, albumId);
  
      res.status(201).json({ message: "Song added successfully", song: newSong });
    } catch (error) {
      console.error("Error adding song:", error);
      res.status(500).json({ message: "Error adding song", error });
    }
  };
module.exports = { addSong };
