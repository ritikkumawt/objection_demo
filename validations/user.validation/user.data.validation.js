const User = require('./user.val.schema')

module.exports = {
    registerUser: async (req, res, next) => {
        const value = await User.registerUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
    loginUser: async (req, res, next) => {
        const value = await User.loginUser.validate(req.body, { abortEarly: false })
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
