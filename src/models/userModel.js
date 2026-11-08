var database = require("../database/config");

function authenticate(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  const instrucaoSql = `
        SELECT id, nome_completo, email, username FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.execute(instrucaoSql);
}

function registerUser(nome, email, username, senha) {
  const instrucaoSql = `
    INSERT INTO usuario (nome_completo, email, username, senha) VALUES 
    ('${nome}', '${email}', '${username}', '${senha}')
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.execute(instrucaoSql);
}

module.exports = {
  authenticate,
  registerUser,
};