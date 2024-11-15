const Favorite = require("../Model/Favourite");
const User = require("../Model/User");
const Song = require("../Model/Song");

const addToFavorites = async (req, res) => {
  const { userId, songId } = req.body;
//   console.log(userId, songId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }

    const existingFavorite = await Favorite.findOne({ userId, songId });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ success: false, message: "Song is already in your favorites" });
    }

    const favorite = new Favorite({
      userId,
      songId,
      addedAt: Date.now(),
    });

    await favorite.save();

    return res
      .status(201)
      .json({ success: true, message: "Song added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again",
      });
  }
};

const getFavourites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.find({ userId })
      .populate("songId")
      .select("songId");

    const favoriteSongIds = favorites.map((fav) => fav.songId._id.toString());

    return res.status(200).send({ success: true, favoriteSongIds });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = { addToFavorites, getFavourites };