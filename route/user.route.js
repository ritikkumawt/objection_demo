const express = require("express")

const User = require("../controller/user.controller")
const userValidation = require("../validations/user.validation/user.data.validation")
const passport = require('../middleware/config.passport')
const {upload} = require("../middleware/user.image.uploadation")
const userRouter = express.Router();

userRouter.post("/create",userValidation.registerUser,User.createUser)
userRouter.post("/login",userValidation.loginUser,User.userLogin)
userRouter.patch("/updatePic",passport.authenticate('jwt', { session: false }),upload.single("profilePic"),User.uploadProfile)

module.exports = userRouter
