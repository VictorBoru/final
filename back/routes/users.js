const express = require("express");
const router = express.Router();
const { REGISTER, LOGIN } = require("../controllers/users");

router.post("/register", REGISTER);
router.post("/logIn", LOGIN);

module.exports = router;