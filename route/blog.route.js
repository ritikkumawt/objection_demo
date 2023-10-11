const express = require("express")

const Blog =require("../controller/blog.controller")
const blogValidation = require("../validations/blog.validation/blog.data.validation")
const passport = require('../middleware/config.passport')

const blogRouter = express.Router();

blogRouter.post("/create",passport.authenticate('jwt', { session: false }),blogValidation.validateBlog,Blog.createBlog)
blogRouter.get("/fulldetails",passport.authenticate('jwt', { session: false }),Blog.blogFullDetail)

module.exports = blogRouter
