const express = require("express");
const { route } = require("express/lib/application");
const { modelNames } = require("mongoose");
const routes = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/clienteAuth");

routes.get("/pessoas/cadastrar/:a?", clienteController.cadastroGet);
routes.post("/pessoas",  clienteController.cadastrarPost);

routes.get('/pessoas/login/:a?',  clienteController.loginG);
routes.post("/pessoas/login",  clienteController.loginP);
routes.get("/pessoas/logout",  clienteController.fazerLogout);
routes.get("/pessoas", auth,  clienteController.listar);
routes.get("/pessoas/relatorio", auth,  clienteController.relatorio);
routes.get("/pessoas/remover/:codigo", auth,  clienteController.remover);
routes.get("/pessoas/atualizar/:codigo", auth, clienteController.atualizarGet);
routes.post("/pessoas/atualizar/:codigo",clienteController.atualizarPost);


routes.get("/pessoas/:codigo", auth,  clienteController.detalhe);




module.exports = routes;