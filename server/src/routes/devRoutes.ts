import express from "express";
import DevController from "../controllers/DevController";

const routes = express.Router();

const devController = new DevController();

routes.get("/", devController.index);
routes.get("/:id", devController.show);
routes.post("/", devController.create);
routes.post("/login", devController.login);
routes.put("/:id", devController.update);

export default routes;
