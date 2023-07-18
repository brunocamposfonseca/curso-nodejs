const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Users = require('../models/Users')

module.exports = function(passport){
  passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
    Users.findOne({email: email}).then((user) => {
      if(!user){
        return done(null, false, {message: "Esta conta não existe"})
      }

      bcrypt.compare(password, user.password, (erro, passIdem) => {
        if(passIdem){
          return done(null, user)
        }else{
          return done(null, false, {message: "Senha incorreta"})
        }
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id,done)=>{
    Users.findById(id).then((user)=>{
        done(null, user)
    }).catch((err)=>{
         done (null, false, {message:'algo deu errado'})
    })
  })

}
