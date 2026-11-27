const database = require("../database/config");

function listPosts() {
  const instructionSql = `
    SELECT id, title, sumary, image, url, published_at
    FROM news
    ORDER BY published_at DESC;
  `;
  return database.execute(instructionSql);
}

module.exports = {
  listPosts,
};
