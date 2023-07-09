const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { ANSWERS, ANSWER, DELETE_ANSWER, LIKES, UPDATE_LIKES } = require("../controllers/answers");

router.get("/question/:id/answers", authMiddleware, ANSWERS);
router.post("/question/:id/answer", authMiddleware, ANSWER);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.get("/questions/:id/answers/:answerId/likes", authMiddleware, LIKES);
router.put("/questions/:id/answers/:answerId/likes", authMiddleware, UPDATE_LIKES);

module.exports = router;