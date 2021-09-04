/**configuração basica do servidor*/

//porta padrão 3003
const port = process.env.PORT || 3003;

const express = require("express");
const server = express();
const allowCors = require("cors"); //politica de cross plataforma
const dbConnection = require("./config/database"); //conexão com o banco

//verificação de erro
dbConnection.on("error", (err) => console.log(`Erro de conexão: ${err}`));

//midleware para as requisições
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(allowCors());

const route = require("./routes");
server.use(route);

server.listen(port, function () {
  console.log(`Backend rodando na porta ${port}.`);
});
