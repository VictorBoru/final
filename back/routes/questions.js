const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { QUESTIONS, QUESTION, DELETE_QUESTION, QUESTION_ID } = require("../controllers/questions");

router.get("/questions", authMiddleware, QUESTIONS);
router.get("/question/:id", authMiddleware, QUESTION_ID);
router.post("/question", authMiddleware, QUESTION);
router.delete("/questions/:id", authMiddleware, DELETE_QUESTION)

module.exports = router;