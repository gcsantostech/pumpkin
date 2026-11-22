const quizModel = require("../models/quizModel");

function questionsQuiz(req, res) {
  quizModel.questionsQuiz()
  .then(result => {
    if (!result)
      return res.status(400).json(result);
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(500).json({ message: "Erro ao carregar quiz" });
  });
}

module.exports = {
  questionsQuiz
};
