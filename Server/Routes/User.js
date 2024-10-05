const express =require("express")
const {register,login,purchasePremium,searchUser} = require("../Controller/User")

const router = express.Router()




router.post("/register",register )
router.post("/login", login)
router.post("/purchasepremium",purchasePremium)
router.get("/searchuser",searchUser)


module.exports = router