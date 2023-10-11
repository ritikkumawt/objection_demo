const joi = require('joi')

const blogSchema = {
    createBlog: joi.object({
        blogName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        description: joi
            .string()
            .max(750)
            .min(20)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
    }).unknown(true),
}

module.exports = blogSchema
