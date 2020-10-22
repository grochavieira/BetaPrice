const express = require("express");
const ClientController = require("../controllers/ClientController");

const routes = express.Router();

const clientController = new ClientController();

routes.get("/", clientController.index);
routes.get("/:id", clientController.show);
// routes.post("/login", clientController.login);
routes.post("/", clientController.store);
routes.put("/:id", clientController.update);

module.exports = routes;
