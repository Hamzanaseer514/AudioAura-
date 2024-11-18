const express =require("express")
const {register,login,purchasePremium,searchUser,getAllUsers,deleteUser,getUserWithId,updateUser} = require("../Controller/User")
const authMiddleware = require('../Middleware/fetchUser');
const router = express.Router()




router.post("/register",register )
router.post("/login", login)
router.post("/purchasepremium",purchasePremium)
router.get("/searchuser",searchUser)
router.get("/getalluser",getAllUsers)
router.delete("/deleteuser",deleteUser)
router.get("/getuserwithid",authMiddleware,getUserWithId)
router.put("/updateUser",authMiddleware,updateUser)


module.exports = router