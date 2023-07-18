// const sequelize = require('sequelize')
// const database = new sequelize('sistemaDeCadastro', 'root', 'Brululof#3001', {
//     host: "localhost",
//     dialect: 'mysql'
// });

// const postagem = database.define('postagens', {
//     titulo: {
//         type: sequelize.STRING
//     },
//     conteudo: {
//         type: sequelize.TEXT
//     }
// });

// postagem.create({
//     titulo: "First Post",
//     conteudo: "lorem"
// })

// const Usuario = database.define('users', {
//     name: {
//         type: sequelize.STRING
//     },
//     lastname: {
//         type: sequelize.STRING
//     },
//     idade: {
//         type: sequelize.INTEGER
//     },
//     email: {
//         type: sequelize.STRING
//     }
// });

// postagem.sync()
// Usuario.sync()

// const express = require('express');
// const app = express();
// const port = 3001;
// // const handlebars = require("express-handlebars");
// // const sequelize = require('sequelize');
// // const database = new sequelize('sistemaDeCadastro', 'root', 'Brululof#3001', {
// //     host: "localhost",
// //     dialect: 'mysql'
// // });

// // app.get("/sobre", (req, res) => {
// //   res.sendFile(__dirname + "/html/sobre.html");
// // });

// // app.get("/aluno/:turma/:nome", (req, res) => {
// //   res.send("<h1>Olá "+req.params.nome+"</h1><h2>A sua turma é do "+req.params.turma+"</h2>");
// // });

// // app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
// // app.set('view engine', 'handlebars')

// // app.get("/", (req, res) => {
// //   res.send("Hello World");
// // });

// // app.get('/cadastro', (req, res) => {
// //     res.send("ROTA DE CADASTRO DE POSTS");
// // });

// app.listen(3001, () => {
//   console.log(`Servidor Rodando na url https://localhost:3001`);
// });