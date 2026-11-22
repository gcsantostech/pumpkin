const database = require("../database/config");

function questionsQuiz() {
  const instructionSql = `
    SELECT
      qz.id AS quiz_id,
      qz.title,
      qz.quiz_description,
      qt.id AS question_id,
      qt.question_text,
      ao.id AS option_id,
      ao.option_text
    FROM quiz qz JOIN question qt
      ON qz.id = qt.quiz_id
    JOIN answer_option ao
        ON ao.question_id = qt.id;      
  `;
  return database.execute(instructionSql).then(groupQuiz);
}

function groupQuiz(rows) {
  if (rows.length === 0) 
    return null;

  const quiz = {
    id: rows[0].quiz_id,
    title: rows[0].title,
    quiz_description: rows[0].quiz_description,
    questions: [],
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    let question = null;
    for (let j = 0; j < quiz.questions.length; j++) {
      if (quiz.questions[j].id === row.question_id) {
        question = quiz.questions[j];
      }
    }

    if (question === null) {
      question = {
        id: row.question_id,
        question_text: row.question_text,
        answer_options: [],
      };
      quiz.questions.push(question);
    }

    question.answer_options.push({
      id: row.option_id,
      option_text: row.option_text,
    });
  }
  return quiz;
}

module.exports = {
  questionsQuiz,
};
