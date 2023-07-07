const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { ANSWERS, ANSWER, DELETE_ANSWER } = require("../controllers/answers");

router.get("/question/:id/answers", authMiddleware, ANSWERS);
router.post("/question/:id/answer", authMiddleware, ANSWER);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);

module.exports = router;