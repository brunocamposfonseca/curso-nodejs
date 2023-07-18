const express = require('express')
const adminRouter = express.Router()
const Categoria = require('../models/Categorias')
const Posts = require('../models/Posts')
const {isAdmin} = require('../helpers/eAdmin')

// Home
adminRouter.get('/', isAdmin, (req, res) => {
  res.render('admin/index')
})

// - Links Posts -------------------------------------------------------------- //

// Post
adminRouter.get('/posts', isAdmin, (req, res) => {
  Posts.find().lean().populate({path: "category", strictPopulate: false}).then((posts) => {
    res.render('admin/posts', {posts: posts})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar as postagens")
    res.redirect('/admin/posts')
    console.log(err)
  })
})

// Add post
adminRouter.get('/posts/add', isAdmin, (req, res) => {
  Categoria.find().lean().then((categorias) => {
    res.render('admin/addposts', {categorias: categorias})
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao carregar o formulário")
    res.redirect('/admin/posts')
  })
})

// New post
adminRouter.post('/posts/new', isAdmin, (req, res) => {
  var errosMsg = [];

  if(!req.body.title || typeof req.body.title == undefined || req.body.title == null){
    errosMsg.push({texto: "Nome muito pequeno"})
  }else if(req.body.title < 2){
    errosMsg.push({texto: "Nome muito pequeno"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    errosMsg.push({texto: "Slug inválido"})
  }else if(req.body.slug < 2){
    errosMsg.push({texto: "Slug muito pequeno"})
  }

  if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
    errosMsg.push({texto: "Descrição inválida"})
  }else if(req.body.description < 5){
    errosMsg.push({texto: "Descrição muito pequena"})
  }

  if(!req.body.content || typeof req.body.content == undefined || req.body.content == null){
    errosMsg.push({texto: "Conteúdo inválido"})
  }else if(req.body.content < 10){
    errosMsg.push({texto: "Conteúdo muito pequeno"})
  }

  if(req.body.category == "0"){
    errosMsg.push({texto: `Categoria inválida, registre uma categoria para continuar!`})
  }

  if(errosMsg.length > 0){
    res.render('admin/addposts', {errosMsg: errosMsg})
    console.log({errosMsg: errosMsg})
  } else {
    const newPost = {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category
    }

    new Posts(newPost).save().then(() => {
      req.flash("success_msg", "Post criada com sucesso!")
      res.redirect("/admin/posts")
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao salvar a postagem, tente novamente!")
      res.redirect("/admin/posts")
    })
  }
})

// Edit post
adminRouter.get('/posts/edit/:id', isAdmin, (req, res) => {
  Posts.findOne({_id: req.params.id}).lean().then((posts) => {
    Categoria.find().lean().then((categorias) => {
      res.render("admin/editpost", {categorias: categorias, posts: posts})
    }).catch((err) => {
      req.flash("error_msg", "Erro ao listar as categorias")
      res.redirect("/admin/posts")
    })
  }).catch((err) => {
    req.flash("error_msg", "Este post não existe")
    res.redirect("/admin/posts")
  })
})

// Process edit post
adminRouter.post('/posts/edit', isAdmin, (req, res) => {
  Posts.findOne({_id: req.body.id}).then((posts) => {
    posts.name = req.body.name
    posts.slug = req.body.slug
    posts.description = req.body.description
    posts.content = req.body.content
    posts.category = req.body.category

    posts.save().then(() => {
      req.flash("success_msg", "Postagem editada com sucesso!")
      res.redirect('/admin/posts')
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno ao salvar o post")
      res.redirect('/admin/posts')
    })
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao editar o post")
    res.redirect("/admin/posts")
    console.log(err)
  })
})

//Delete post (insegure form)
adminRouter.get('/posts/delete/:id', isAdmin, (req, res) => {
  Posts.deleteOne({_id: req.params.id}).then(() =>  {
    req.flash("success_msg", "Post deletado com sucesso!")
    res.redirect('/admin/posts')
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro interno!")
    res.redirect('/admin/posts')
  })
})

// - Individual Page for each post -------------------------------------------- //

adminRouter.get('/posts/:slug', isAdmin, (req, res) => {
  Posts.findOne({slug: req.params.slug}).lean().then((post) => {
    if(post){
      res.render('user/viewPost', {post: post})
    } else {
      req.flash("error_msg", "Este post não existe")
      res.redirect("/admin")
    }
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro interno")
    res.redirect("/admin")
  })
})

// - Links Categories---------------------------------------------------------- //

// Categories
adminRouter.get('/cat', isAdmin, (req, res) => {
  Categoria.find().sort({name: ''}).lean().then((categorias) => {
    res.render('admin/cat', {categorias: categorias})
  }).catch((err) => {
      req.flash('error_msg', 'Erro ao listar categorias')
      res.redirect('/admin')
  })
})

// Add category
adminRouter.get('/cat/add', isAdmin, (req, res) => {
    res.render("admin/addcat")
})

// Process new category
adminRouter.post('/cat/new', isAdmin, (req, res) => {
  var errosMsg = [];

  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errosMsg.push({texto: "Nome inválido"})
  }

  if(req.body.name < 2){
    errosMsg.push({texto: "Nome muito pequeno"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    errosMsg.push({texto: "Slug inválido"})
  }

  if(errosMsg.length > 0){
    res.render('admin/addcat', {errosMsg: errosMsg})
    console.log({errosMsg: errosMsg})
  } else {
    const newCategorie = {
      name: req.body.name,
      slug: req.body.slug,
      date: req.body.date
    }

    new Categoria(newCategorie).save().then(() => {
      req.flash("success_msg", "Categoria criada com sucesso!")
      res.redirect("/admin/cat")
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
      res.redirect("/admin/cat")
    })
  }

})

// Edit category
adminRouter.get('/cat/edit/:id', isAdmin, (req, res) => {
  Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
    res.render("admin/editcat", {categoria: categoria})
  }).catch((err) => {
    req.flash("error_msg", "Esta categoria não existe")
    res.redirect("/admin/cat")
  })
})

// Process edit category
adminRouter.post('/cat/edit', isAdmin, (req, res) => {
  var errosMsg = [];

  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errosMsg.push({texto: "Nome inválido"})
  }else if(req.body.name < 2){
    errosMsg.push({texto: "Nome muito pequeno"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    errosMsg.push({texto: "Slug inválido"})
  }

  if(errosMsg.length > 0){
    res.render('admin/editcat', {errosMsg: errosMsg})
    console.log({errosMsg: errosMsg})
  } else {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
      categoria.name = req.body.name
      categoria.slug = req.body.slug

      categoria.save().then(() => {
        req.flash("success_msg", "Categoria editada com sucesso!")
        res.redirect('/admin/cat')
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao salvar a categoria")
        res.redirect('/admin/cat')
      })
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar a categoria")
      res.redirect("/admin/cat")
    })
  }
})

// Delete category
adminRouter.post('/cat/delete', isAdmin, (req, res) => {
  Categoria.deleteOne({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Categoria deletada com sucesso!")
    res.redirect('/admin/cat')
  }).catch((err) => {
    req.flash("error_msg", "Erro ao deletar a categoria")
    res.redirect('/admin/cat')
  })
})

module.exports = adminRouter;
