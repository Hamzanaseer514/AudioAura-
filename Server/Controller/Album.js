const Joi = require("joi");
const Album = require("../Model/Album"); // Ensure Album is imported

const addAlbum = async (req, res) => { // Accept req and res as parameters
  const albumSchema = Joi.object({
    name: Joi.string().min(3).required(),
    image: Joi.string().uri().required(),
    desc: Joi.string().min(10).required(),
    bgColor: Joi.string().min(3).required(), // For hex color codes
  });

  try {
    const { error } = albumSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Validation error", details: error.details });
    }

    const { name, image, desc, bgColor } = req.body;

    const existingAlbum = await Album.findOne({ name });
    if (existingAlbum) {
      return res.status(400).json({ message: "Album with this name already exists" });
    }

    const newAlbum = await Album.create({
      name,
      image,
      desc,
      bgColor,
    });

    res.status(201).json({ message: "Album added successfully", album: newAlbum });
  } catch (error) {
    res.status(500).json({ message: "Error adding album", error });
  }
};

const deleteAlbum = async (req, res) => {
    const { id } = req.params; // Get album ID from request parameters
  
    try {
      const deletedAlbum = await Album.findByIdAndDelete(id); // Delete the album
  
      if (!deletedAlbum) {
        return res.status(404).json({ message: 'Album not found' });
      }
  
      res.status(200).json({ message: 'Album deleted successfully', album: deletedAlbum });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting album', error });
    }
  };

module.exports = { addAlbum, deleteAlbum };
