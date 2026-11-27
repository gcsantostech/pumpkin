const environment = "prod";

const pathEnv = environment === "prod" ? ".env" : ".env.dev";

require("dotenv").config({ path: pathEnv });

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/user");
const quizRouter = require("./src/routes/quiz");
const dashboardRouter = require("./src/routes/dashboard");
const postsRouter = require("./src/routes/posts");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/user", usuarioRouter);
app.use("/quiz", quizRouter); 
app.use("/dashboard", dashboardRouter)
app.use("/posts", postsRouter);

app.listen(PORT_APP, () => {
  console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORT_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.ENVIRONMENT}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
