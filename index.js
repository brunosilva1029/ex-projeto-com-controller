const express = require("express");
const { redirect } = require("express/lib/response");
const res = require("express/lib/response");
const app = express();
require('dotenv/config');



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));//para poder botar o caminho do arquivo /css/nomedoarquivo
const session = require("express-session");
app.use(session({
    secret: 'loja',
    saveUninitialized:false,
    resave: false
    }));

const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI);//conectando banco de dados com a url dada no site
//vai representar o cliente 
const clienteRoutes = require("./routes/clienteRoutes");
app.use(clienteRoutes);
const produtoRoutes = require("./routes/produtoRoutes");
app.use(produtoRoutes);


// const pessoaList = [];
// const pessoa1  = new Pessoa("Antônio", 18, 4341);
// const pessoa2 = new Pessoa("Monika", 18, 4141);
// const pessoa3 = new Pessoa("Natsu", 19, 3434);
// pessoaList.push(pessoa1);
// pessoaList.push(pessoa2);
// pessoaList.push(pessoa3);
// console.log(pessoaList);

const auth = require("./middlewares/clienteAuth");
app.get("/", auth, function(req, res){//parametros, requisição e resposta
    res.render("index");
});//pagina inicial da aplicação










app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
    console.log(session.usuario)
});


