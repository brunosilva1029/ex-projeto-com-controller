const mongoose =  require("mongoose");
const Schema = mongoose.Schema;//coleções/tabelas
const produtoSchema = Schema({
    nome:String,
    codigo:Number,
    plataforma:String
});
module.exports = mongoose.model("Produto", produtoSchema);