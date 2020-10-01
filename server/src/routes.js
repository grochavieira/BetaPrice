const express = require("express");
const ClientController = require("./controllers/ClientController");
const DevController = require("./controllers/DevController");
const ServiceController = require("./controllers/ServiceController");

const routes = express.Router();

const clientController = new ClientController();
const devController = new DevController();
const serviceController = new ServiceController();

routes.get("/client", clientController.index);
routes.get("/client/:id", clientController.show);
routes.post("/client", clientController.create);
routes.post("/client/login", clientController.login);
routes.put("/client/:id", clientController.update);

routes.get("/dev", devController.index);
routes.get("/dev/:id", devController.show);
routes.post("/dev", devController.create);
routes.post("/dev/login", devController.login);
routes.put("/dev/:id", devController.update);

routes.get("/service", serviceController.index);
routes.get("/service/:id", serviceController.show);
routes.post("/service", serviceController.create);

module.exports = routes;
