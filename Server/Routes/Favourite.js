const express = require("express")
const router = express.Router()
const {addToFavorites,getFavourites} = require("../Controller/Favourite")
const authMiddleware = require("../Middleware/fetchUser")

router.post("/addfavourite",authMiddleware,addToFavorites)

router.get("/favorites", authMiddleware,getFavourites);
  

module.exports = router