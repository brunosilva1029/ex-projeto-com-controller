const ClienteModel = require("../models/ClienteModel");
const bcrypt = require("bcryptjs");
class ClienteController{
    static async detalhe(req, res){
        
        let resultado;
        const pessoas = await ClienteModel.find();//pega todos os clientes
        let codigo = req.params.codigo;//pega o parametro do codigo
        for(let quebra= 0; quebra < pessoas.length; quebra++){//busca com codição se pessoa.codigo é igual a codigo pegado
           const pessoa = pessoas[quebra];
              if (pessoa.codigo  == codigo){
                  resultado = pessoa;
                  break;//quebra de laço pós achar o certo
              }; 
          
              
             }
             
        res.render("pessoa/detalhar",{resultado});
    };//carregamento da pagina detalhar com pessoa do codigo

    static async cadastrarPost(req, res){//parametros, requisição e resposta

        const pessoa = req.body;
        // const pessoaPront = new Pessoa(pessoa.nome, pessoa.idade, pessoa.codigo);
        //pessoaList.push(pessoaPront);// tbm pode botar sem as duas primeiras linhas se der um push no obejto(no caso pessoa) diretamente

        const pessoaTeste = await ClienteModel.findOne({email: pessoa.email});
        if(pessoaTeste == undefined){

            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(pessoa.senha, salt)
            const novoCliente = new ClienteModel({codigo:pessoa.codigo, idade:pessoa.idade,nome:pessoa.nome, email: pessoa.email, senha: hash})
            await novoCliente.save(); //salvando no banco de dados
                
            res.redirect("pessoas");
        }else{
            res.redirect("/pessoas/cadastrar/1");
        }

    }
    
    static  async  cadastroGet(req, res){//parametros, requisição e resposta
        const alerta = req.params.a;
        res.render("pessoa/cadastrar", {alerta});
    }

    static  async listar(req, res){//parametros, requisição e resposta
            //console.log(pessoaList)
            const pessoas = await ClienteModel.find();
            
           // res.render("pessoas",{pessoaList});
            res.render("pessoa/listar", {pessoas});
        } 

    static  async relatorio(req, res){//parametros, requisição e resposta
        //console.log(pessoaList)
        const pessoas = await ClienteModel.find();
            
        // res.render("pessoas",{pessoaList});
        res.render("pessoa/relatorio", {pessoas});
    } 

    static  async remover(req, res){//parametros, requisição e resposta
        let codig = req.params.codigo;//pega o parametro do codigo 
        const resultado = await ClienteModel.findOneAndDelete({codigo:codig});
        const pessoas = await ClienteModel.find();
        res.render("pessoa/listar", {pessoas});
        //res.redirect("/pessoas");
    } 

    
    static  async fazerLogout(req, res){//parametros, requisição e resposta
        req.session.destroy();
        res.redirect("/pessoas/login")
    }

    static async atualizarGet(req, res){
        let codig = req.params.codigo;
        const resultado  = await ClienteModel.findOne({codigo:codig});
        res.render("pessoa/atualizar", {resultado});
        // let codig = req.params.codigo;
        // 
    }

    static async atualizarPost(req, res){
        const novoDado  = req.body;
        let codig = req.params.codigo;
        const resultado = await ClienteModel.findOneAndUpdate({codigo:codig},{nome:novoDado.nome, idade: novoDado.idade, codigo: novoDado.codigo});
        res.redirect("/pessoas");

        
    }

    static async loginG(req, res){
        const alerta = req.params.a;
        res.render("pessoa/login", {alerta});
        
    }

    static async loginP(req, res){
        /*const loginV = req.body;
       
        const pessoas = await ClienteModel.find();//pega todos os clientes
        //pega o parametro do codigo
        for(let quebra= 0; quebra < pessoas.length; quebra++){//busca com codição se pessoa.codigo é igual a codigo pegado
           const pessoa = pessoas[quebra];
              if (pessoa.email == loginV.email){
                  if(pessoa.senha == loginV.senha){
                    req.session.usuario = loginV.email;
                    console.log("Antônio vai conseguir hoje!");
                    res.redirect("/");
                  } else{
                      res.render("404");
                  }
                 //quebra de laço pós achar o certo
              }; 
          
              
             }*/
        const cliente = req.body;
        const email = cliente.email;
        const resultado = await ClienteModel.findOne({email: email});
        if(resultado != undefined){
            const hash1 = resultado.senha;
            if(bcrypt.compareSync(cliente.senha, hash1)){
                req.session.usuario = resultado.email;
                res.redirect("/");
            }else{res.redirect("/pessoas/login/1")}
        }else{res.redirect("/pessoas/login/1")}
    }
    

    

}
module.exports = ClienteController;