const express = require("express");
const { route } = require("express/lib/application");
const { modelNames } = require("mongoose");
const routes = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/clienteAuth");

routes.get("/pessoas/cadastrar", clienteController.cadastroGet);
routes.post("/pessoas",  clienteController.cadastrarPost);

routes.get("/pessoas/login",  clienteController.loginG);
routes.post("/pessoas/login",  clienteController.loginP);
routes.get("/pessoas", auth,  clienteController.listar);
routes.get("/pessoas/remover/:codigo", auth,  clienteController.remover);
routes.get("/pessoas/atualizar/:codigo", auth, clienteController.atualizarGet);
routes.post("/pessoas/atualizar/:codigo",clienteController.atualizarPost);


routes.get("/pessoas/:codigo", auth,  clienteController.detalhe);


//routes.get("/pessoas/logout", auth,  clienteController.sair);

module.exports = routes;