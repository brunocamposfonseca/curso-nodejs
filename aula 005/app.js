const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post')
const app = express();
const PORT = 3001;

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Hello World")
});

app.get('/cadastro', (req, res) => {
  res.render('formulario');
});

app.get('/tables', (req, res) => {
  Post.all().then((posts) => {
    res.render("tables", {posts: posts});
  });
});

app.post('/add', (req, res) => {
  // res.send("Formulário recebido! </br> Título: "+req.body.titulo+"</br>Conteúdo: "+req.body.conteudo)
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  })
});

app.get('/deletar/:id', (req, res) => {
  Post.destroy({where: {'id': req.params.id}}).then(() => {
    res.send("Postagem deletada com sucesso!")
  }).catch((error) => {
    res.send("Erro ao deletar a postagem: "+error)
  })
})

app.listen(PORT, () => {
  console.log(`Servidor: https://localhost:${PORT}`)
});