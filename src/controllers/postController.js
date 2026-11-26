const postModel = require("../models/postModel");

function listPosts(req, res) {
  postModel
    .listPosts()
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.log("Erro ao listar posts:", error);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = { listPosts };
