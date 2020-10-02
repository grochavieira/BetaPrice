const express = require("express");
const ServiceController = require("../controllers/ServiceController");

const routes = express.Router();

const serviceController = new ServiceController();

routes.get("/", serviceController.index);
routes.get("/:id", serviceController.show);
routes.post("/", serviceController.store);
routes.put("/:id", serviceController.update);

module.exports = routes;
