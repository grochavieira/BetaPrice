import express from "express";
import ClientController from "./controllers/ClientController";
import DevController from "./controllers/DevController";

const routes = express.Router();

const clientController = new ClientController();
const devController = new DevController();

routes.get("/client", clientController.index);
routes.get("/client/:id", clientController.show);
routes.post("/client", clientController.create);
routes.put("/client/:id", clientController.update);

routes.get("/dev", devController.index);
routes.get("/dev/:id", devController.show);
routes.post("/dev", devController.create);
routes.put("/dev/:id", devController.update);

export default routes;
