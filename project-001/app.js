// Imports
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const adminRouter = require('./routes/adminRoutes')
const usersRouter = require('./routes/usersRoutes')
const router = require('./routes/Routes')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const auth = require('./config/auth')(passport)

// Configurations
const app = express()
const PORT = process.env.PORT || 3001;
    // Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
    // Handlebars
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
    // Public
app.use(express.static(path.join(__dirname,"public"))) // Configuring static files folder
    // Middleware
// app.use((req, res, next) => {
//   console.log("Oi, eu sou um Middleware!")
//   next()
// })
    // Create Session
app.use(session({
  secret: "cursodenode", // Key for geretion a session
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
    // Middleware session
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null;
  next()
})

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/blogdb").then(() => {
  console.log("Conectado com o MongoDB");
}).catch((err) => {
  console.log("Erro ao se conectar: "+err)
})

// Routes group
app.use('/', router)
app.use('/admin', adminRouter)
app.use('/users', usersRouter)

// Create Server
app.listen(PORT, () => {
    console.log(`O Servidor está Rodando na URL https://localhost:${PORT}`)
})
