import express from "express";
import ClientController from "./controllers/ClientController";
import DevController from "./controllers/DevController";

const routes = express.Router();

const clientController = new ClientController();
const devController = new DevController();

routes.get("/client", clientController.index);
routes.post("/client", clientController.create);
routes.put("/client/:id", clientController.update);

routes.get("/dev", devController.index);
routes.post("/dev", devController.create);
routes.put("/dev/:username", devController.update);

export default routes;
