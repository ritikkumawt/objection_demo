const express = require("express")

const userRouter = require("./user.route")
const blogRouter= require("./blog.route")

const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/blog",blogRouter)

module.exports = mainRouter
