const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

router.get("/questions", (req, res) => {
  quizController.questionsQuiz(req, res);
});

router.post("/register-attempt", (req, res) => {
  quizController.registerAttempt(req, res);
});

router.post("/register-answer", (req, res) => {
  quizController.registerAnswer(req, res);
});

module.exports = router;
