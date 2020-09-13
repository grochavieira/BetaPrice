import { Request, Response } from "express";

class DevController {
  async index(request: Request, response: Response) {
    response.send("index");
  }

  async show(request: Request, response: Response) {
    response.send("show");
  }

  async create(request: Request, response: Response) {
    response.send("create");
  }

  async update(request: Request, response: Response) {
    response.send("update");
  }
}

export default DevController;
