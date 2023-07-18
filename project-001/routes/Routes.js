const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categorias')
const Posts = require('../models/Posts')

router.get('/', (req, res) => {
  Posts.find().lean().populate('category').sort({data: "desc"}).then((posts) => {
    res.render('index', {posts: posts})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro interno")
    res.redirect('/404')
  })
})

router.get('/cats', (req, res) => {
  Categoria.find().lean().then((categorias) => {
    res.render('user/cats', {categorias: categorias})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro interno ao listar as categorias")
    res.redirect('/')
  })
})

router.get('/cats/:slug', (req, res) => {
  Categoria.findOne({slug: req.params.slug}).lean().then((category) => {
    if(category){
      Posts.find({category: category._id}).lean().then((posts) => {
        res.render('user/postCats', {posts: posts, category: category})
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os posts!")
        res.redirect('/')
      })
    } else {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect('/')
    }
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria")
    res.redirect('/')
  })
})

// - Pages of Errors ---------------------------------------------------------- //

router.get('/404', (req, res) => {
  res.send("Erro 404!")
})

module.exports = router;
