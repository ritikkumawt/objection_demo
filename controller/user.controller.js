const User = require("../model/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //signup api
  createUser: async (req, res) => {
    try {
      const saltRounds = 10;
      const { userEmail, userName, userPassword, userAddress, userGender } =
        req.body;
      const existingUser = await User.query().findOne({ userEmail });
      if (existingUser) {
        return res.status(401).send({
          success: false,
          message:
            "User is Already Registered with this email, You can only Login",
        });
      }
      const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
      const newUser = await User.query().insert({
        userAddress,
        userGender,
        userName,
        userEmail,
        userPassword: hashedPassword,
      });
      res.status(201).send({
        success: true,
        message: "User Created Successfully ✔ .",
        data: newUser,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error",
        error: error.message,
      });
    }
  },
  // for login
  userLogin: async (req, res) => {
    try {
      const userEmail = req.body.userEmail;
      const userPassword = req.body.userPassword;
      const user = await User.query().findOne({ userEmail });
      if (user) {
        const isPasswordValid = await bcrypt.compare(
          userPassword,
          user.userPassword
        );
        if (isPasswordValid) {
          const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).send({
            success: true,
            message: "User Login Successfully.",
            token: token,
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Email or Password is incorrect.",
          });
        }
      } else {
        res.status(401).send({
          success: false,
          message: "Email is not valid, first create an account.",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error Occurs.",
        error: error.message,
      });
    }
  },
  // for profile pic updation
  uploadProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const userData = await User.query().findById(userId);
      if (!userData) {
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }
      userData.profilePic = `C:/Users/bitcot/Desktop/objection_demo/objection_demo/uploads${req.file.filename}`;
      await userData.$query().patchAndFetch({profilePic: userData.profilePic});
      res.status(200).send({
        success: true,
        message: "User profile updated",
        updatedData: userData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: `Error occurred: ${error.message}`,
      });
    }
  },
};
