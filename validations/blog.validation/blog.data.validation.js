const Blog = require('./blog.val.schema')

module.exports = {
    validateBlog: async (req, res, next) => {
        const value = await Blog.createBlog.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
