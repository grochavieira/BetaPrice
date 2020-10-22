const express = require("express");
const DevController = require("../controllers/DevController");
const clientLoginRequired = require("../middlewares/clientLoginRequired");

const routes = express.Router();

const devController = new DevController();

routes.get("/", clientLoginRequired, devController.index);
routes.get("/:id", devController.show);
// routes.post("/login", devController.login);
routes.post("/", devController.store);
routes.put("/:id", devController.update);

module.exports = routes;
