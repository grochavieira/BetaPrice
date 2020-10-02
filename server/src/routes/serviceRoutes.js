const express = require("express");
const ServiceController = require("../controllers/ServiceController");

const routes = express.Router();

const serviceController = new ServiceController();

routes.get("/", serviceController.index);
routes.get("/:id", serviceController.show);
routes.post("/", serviceController.store);

module.exports = routes;
