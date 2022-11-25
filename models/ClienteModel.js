const mongoose =  require("mongoose");
const Schema = mongoose.Schema;//coleções/tabelas
const clienteSchema = Schema({
    nome:String,
    codigo:String,
    idade:Number, 
    email:String,
    senha:String
});
module.exports = mongoose.model("Cliente", clienteSchema);
