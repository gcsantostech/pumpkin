const database = require("../database/config");

function dataDashboard(user_id) {
  const instructionSql = `
    SELECT
      cp.id AS profile_id,
      cp.profile_name AS profile_name,
      cp.description AS description,
      SUM(ao.score) as score,
      COUNT(DISTINCT ua.attempt_id) AS qtd_attempt 
    FROM quiz_attempt qa JOIN user_answer ua
      ON qa.id = ua.attempt_id
    JOIN answer_option ao 
      ON ao.id = ua.option_id
    JOIN  creative_profile cp
      ON cp.id = ao.profile_id
    WHERE qa.user_id = ${user_id}
    GROUP BY profile_id, profile_name, description
    ORDER BY score DESC;
  `;
  return database.execute(instructionSql);
}

function dataChartRadar(user_id) {
  const instructionSql = `
    SELECT
      cp.profile_name AS profile_name,
        SUM(ao.score) AS score_total,
        COUNT(DISTINCT ua.attempt_id) AS max_score
    FROM quiz_attempt qa JOIN user_answer ua
      ON qa.id = ua.attempt_id
    JOIN answer_option ao 
      ON ao.id = ua.option_id
    JOIN  creative_profile cp
      ON cp.id = ao.profile_id
    WHERE qa.user_id = ${user_id}
    GROUP BY profile_name
    ORDER BY score_total DESC;
  `

  return database.execute(instructionSql)
}

function dataChartDougnut(user_id) {
  const instructionSql = `
    SELECT
      cp.profile_name AS profile_name,
      SUM(ao.score) AS score_total
    FROM quiz_attempt qa JOIN user_answer ua
      ON qa.id = ua.attempt_id
    JOIN answer_option ao 
      ON ao.id = ua.option_id
    JOIN  creative_profile cp
      ON cp.id = ao.profile_id
    WHERE qa.user_id = ${user_id}
    GROUP BY profile_name
    ORDER BY score_total DESC; 
  `

  return database.execute(instructionSql)
}

module.exports = {
  dataDashboard,
  dataChartRadar,
  dataChartDougnut
};
