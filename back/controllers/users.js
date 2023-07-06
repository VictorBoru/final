const uniqid = require("uniqid");
const UserModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.REGISTER = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      if (!email.includes("@")) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      
      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({ message: "Error generating salt" });
        }

        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.status(500).json({ message: "Error hashing password" });
          }

          const newUser = new UserModel({
            email,
            password: hash,
            name: nameCapitalized,
            id: uniqid(),
          });

          try {
            await newUser.save();
            res.status(200).json({ response: "User was saved successfully" });
          } catch (err) {
            res.status(500).json({ message: "Error saving user" });
          }
        });
      });
    } catch (err) {
      res.status(500).json({ response: "User was not saved" });
    }
};

module.exports.LOGIN = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ response: "Bad Data" });
      }
  
      bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {
              algorithm: "RS256",
            }
          );
  
          return res.status(200).json({ 
            response: "Successfully logged in", 
            jwt: token,
          });
        } else {
          return res.status(404).json({ response: "Invalid email or password" });
        }
      });
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ response: "An error occurred, please try later" });
    }
};
  