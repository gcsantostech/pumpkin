const usuarioModel = require("../models/userModel");

function authenticate(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (email === undefined)
    return res.status(400).json({ message: "Seu email está undefined!" });
  if (password === undefined)
    return res.status(400).json({ message: "Sua senha está indefinida!" });

  usuarioModel.authenticate(email, password)
  .then(result => {
    if (result.length === 1) return res.send(result[0]);
      return res.status(400)
      .json({message: "Email/senha invalidos. Verifique suas credenciais."});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Erro ao tentar realizar o login." });
    });
}

function registerUser(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (name === undefined)
    return res.status(400).json({ message: "Seu nome está undefined" });
  if (email === undefined)
    return res.status(400).json({ message: "Seu email está undefined" });
  if (username === undefined)
    return res.status(400).json({ message: "Seu username está undefined" });
  if (password === undefined)
    return res.status(400).json({ message: "Sua senha está undefined" });

  usuarioModel.registerUser(name, email, username, password)
  .then(result => {
    res.status(201).json({result});
  })
  .catch(error => {
    console.log(error);    
    res.status(500).json({message: "Erro ao tentar realizar o cadastro."});
  });
}

module.exports = {
  authenticate,
  registerUser,
};
