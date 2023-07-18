const express = require('express')
const usersRoutes = express.Router()
const mongoose = require('mongoose')
const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

usersRoutes.get('/records', (req, res) => {
  res.render('user/records')
})

usersRoutes.post('/records/new', (req, res) => {
  var errosMsg = [];

  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errosMsg.push({texto: "Nome inválido"})
  }

  if(req.body.name < 2){
    errosMsg.push({texto: "Nome muito pequeno"})
  }

  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    errosMsg.push({texto: "Email inválido"})
  }

  if(req.body.email < 5){
    errosMsg.push({texto: "Email muito pequeno"})
  }

  if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
    errosMsg.push({texto: "Senha inválido"})
  }

  if(req.body.password.length < 8){
    errosMsg.push({texto: "Senha muito pequena"})
  }

  if(req.body.password != req.body.password2 ){
    errosMsg.push({texto: "As senhas não são iguais"})
  }

  if(errosMsg.length > 0){
    res.render('user/records', {errosMsg: errosMsg})
    console.log({errosMsg: errosMsg})
  } else {
    Users.findOne({email: req.body.email}).lean().then((user) => {
      if(user){
        req.flash("error_msg", "Já existe uma conta com este email no nosso sistema!")
        res.redirect("/records")
      }else{
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          birth: req.body.birth,
        })

        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(newUser.password, salt, (erro, hash) => {
            if(erro){
              req.flash("error_msg", "Houve um erro durante o salvamento do usuário")
              res.redirect('/')
            }else{
              newUser.password = hash;
              newUser.save().then(() => {
                req.flash("success_msg", "Usuário criado com sucesso!")
                res.redirect('/')
              }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao criar o usuário")
              })
            }
          })
        })
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno")
      res.redirect("/")
    })
  }
})

usersRoutes.get('/login', (req, res) => {
  res.render('user/login')
})

usersRoutes.post('/login', (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next)
})

usersRoutes.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err) 
    }
    req.flash("success_msg", "Usuário deslogado com sucesso!")
    res.redirect('/')
  })
})

module.exports = usersRoutes
