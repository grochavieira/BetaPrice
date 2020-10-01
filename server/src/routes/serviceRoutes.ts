import express from "express";
import ServiceController from "../controllers/ServiceController";

const routes = express.Router();

const serviceController = new ServiceController();

routes.get("/", serviceController.index);
routes.get("/:id", serviceController.show);
routes.post("/", serviceController.create);

export default routes;
