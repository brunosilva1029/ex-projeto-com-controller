const express = require("express");
const { route } = require("express/lib/application");
const { modelNames } = require("mongoose");
const routes = express.Router();
const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/clienteAuth");

routes.get("/produtos/cadastrar", auth, produtoController.cadastroGet);
routes.post("/produtos", auth,  produtoController.cadastrarPost);

routes.get("/produtos", auth,  produtoController.listar);
routes.get("/produtos/relatorio", auth,  produtoController.relatorio);
routes.get("/produtos/remover/:codigo", auth,  produtoController.remover);
routes.get("/produtos/atualizar/:codigo", auth, produtoController.atualizarGet);
routes.post("/produtos/atualizar/:codigo", auth, produtoController.atualizarPost);


routes.get("/produtos/:codigo", auth,  produtoController.detalhe);



module.exports = routes;