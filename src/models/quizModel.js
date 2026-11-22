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

function registerAttempt(user_id, quiz_id) {
  const instructionSql = `
    INSERT INTO quiz_attempt (user_id, quiz_id) VALUES 
    (${user_id}, ${quiz_id});
  `;
  return database.execute(instructionSql);
}

function registerAnswer(attempt_id, question_id, option_id) {
  const instructionSql = `
    INSERT INTO user_answer (attempt_id, question_id, option_id) VALUES
    (${attempt_id}, ${question_id}, ${option_id})
  `
  return database.execute(instructionSql)
}

function creativeProfile(attempt_id, user_id) {
  const instructionSql = `
    SELECT
      cp.id,
      cp.profile_name AS profile_name,
      cp.description AS description,
      SUM(ao.score) as total_score
    FROM quiz_attempt qa JOIN user_answer ua
      ON qa.id = ua.attempt_id
    JOIN answer_option ao 
      ON ao.id = ua.option_id
    JOIN  creative_profile cp
      ON cp.id = ao.profile_id
    WHERE qa.id = ${attempt_id} AND qa.user_id = ${user_id}
    GROUP BY cp.id, user_id, profile_name, description
    ORDER BY total_score DESC, cp.id ASC
    LIMIT 2;
  `

  return database.execute(instructionSql)
}

module.exports = {
  questionsQuiz,
  registerAttempt,
  registerAnswer,
  creativeProfile
};
