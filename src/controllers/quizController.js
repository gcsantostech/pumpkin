const quizModel = require("../models/quizModel");

function questionsQuiz(req, res) {
  quizModel
    .questionsQuiz()
    .then((result) => {
      if (!result) return res.status(400).json(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: "Erro ao carregar quiz" });
    });
}

function registerAttempt(req, res) {
  const user_id = req.body.user_id;
  const quiz_id = req.body.quiz_id;

  if (user_id === undefined) return res.status(400).json();
  if (quiz_id === undefined) return res.status(400).json();

  quizModel
    .registerAttempt(user_id, quiz_id)
    .then((result) => {
      res.status(201).json({ attemptId: result.insertId });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(result);
    });
}

function registerAnswer(req, res) {
  const { attemptId, answers } = req.body;

  if (attemptId === undefined) return res.status(400).json();
  if (answers.length === 0) return res.status(400).json();

  try {
    for (let i = 0; i < answers.length; i++) {
      quizModel.registerAnswer(
        attemptId,
        answers[i].question_id,
        answers[i].option_id,
      );
    }

    res.status(201).json({ message: "Quiz concluído com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar enviar o quiz." });
  }
}

function creativeProfile(req, res) {
  const userId = req.body.user_id
  const attemptId = req.body.attempt_id

  if (userId === undefined)
    return res.status(400).json()
  if (attemptId === undefined)
    return res.status(400).json()

  quizModel.creativeProfile(attemptId, userId)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json(error)
  })
}

module.exports = {
  questionsQuiz,
  registerAttempt,
  registerAnswer,
  creativeProfile
};
