const ProdutoModel = require("../models/ProdutoModel");
class ProdutoController{
    
    static async detalhe(req, res){
        
        let cod = req.params.codigo;
        const resultado = await ProdutoModel.findOne({codigo: cod});
             
        console.log("plataforma: ")
        res.render("produto/detalhar",{resultado});
    };//carregamento da pagina detalhar com produto do codigo

    static async cadastrarPost(req, res){//parametros, requisição e resposta
            const produto = req.body;
           // const pessoaPront = new Pessoa produto.nome, produto.idade, produto.codigo);
           //pessoaList.push(pessoaPront);// tbm pode botar sem as duas primeiras linhas se der um push no obejto(no caso produto) diretamente
            const novoProduto = new ProdutoModel({codigo: produto.codigo, nome: produto.nome, plataforma: produto.plataforma})
            await novoProduto.save(); //salvando no banco de dados
            
             res.redirect("produtos");

         }
    
    static  async  cadastroGet(req, res){//parametros, requisição e resposta
            res.render( "produto/cadastrar");
    }

    static  async listar(req, res){//parametros, requisição e resposta
            //console.log(pessoaList)
            const produtos = await ProdutoModel.find();
            
           // res.render("produtos",{pessoaList});
            res.render( "produto/listar", {produtos});
    } 
    static  async relatorio(req, res){
            const produtos = await ProdutoModel.find();
            res.render( "produto/relatorio", {produtos});
    } 

    static  async remover(req, res){//parametros, requisição e resposta
        let codig = req.params.codigo;//pega o parametro do codigo 
        const resultado = await ProdutoModel.findOneAndDelete({codigo:codig});
        const pessoas = await ProdutoModel.find();
        res.redirect("/produtos");
    } 

    static async atualizarGet(req, res){
        let codig = req.params.codigo;
        const resultado  = await ProdutoModel.findOne({codigo:codig});
        res.render( "produto/atualizar", {resultado});
        // let codig = req.params.codigo;
        // 
    }

    static async atualizarPost(req, res){
        const novoDado  = req.body;
        let codig = req.params.codigo;
        const resultado = await ProdutoModel.findOneAndUpdate({codigo:codig},{nome:novoDado.nome, plataforma: novoDado.plataforma, codigo: novoDado.codigo});
        res.redirect("/produtos");

        
    }
    
}
module.exports = ProdutoController;