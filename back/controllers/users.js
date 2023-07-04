const uniqid = require("uniqid");
const UserModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.REGISTER = async (req, res) => {
    try {
      const user = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email,
        id: uniqid(),
        cardsGroups: [],
      });
  
      await user.save();
  
      res.status(200).json({ response: "Registration successfull" });
    } catch (err) {
      res.status(500).json({ response: "Registration failed, try again later" });
    }
  };

module.exports.LOGIN = async (req, res) => {
  try {
    res.status(200).json({ user: "LOGIN" });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ response: "ERROR, please try later" });
  }
};
