module.exports = {
  isAdmin: function(req, res, next){
    if(req.isAuthenticated() && req.user.eAdmin == 1){
      return next();
    }else{
      req.flash("error_msg", "Você deve estar logado para entrar aqui")
      res.redirect("/")
    }
  }
}