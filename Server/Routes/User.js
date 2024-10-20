const express =require("express")
const {register,login,purchasePremium,searchUser,getAllUsers,deleteUser} = require("../Controller/User")

const router = express.Router()




router.post("/register",register )
router.post("/login", login)
router.post("/purchasepremium",purchasePremium)
router.get("/searchuser",searchUser)
router.get("/getalluser",getAllUsers)
router.delete("/deleteuser",deleteUser)


module.exports = router