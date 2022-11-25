function auth(req, res, next){
    if(req.session.usuario){
        next();
    } else{
        res.redirect("/pessoas/login");
    }
    
}
    
module.exports = auth;