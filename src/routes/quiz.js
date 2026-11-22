const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

router.get("/questions", (req, res) => {
  quizController.questionsQuiz(req, res);
});

module.exports = router;
