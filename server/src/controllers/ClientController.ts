import { Request, Response } from "express";
import ClientModel from "../models/ClientModel";
const bcryptjs = require("bcryptjs");

class ClientController {
  async index(request: Request, response: Response) {
    const clients = await ClientModel.find();

    response.send(clients);
  }

  async create(request: Request, response: Response) {
    const { name, email, telephone, username, password } = request.body;

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    const answer = await ClientModel.create({
      name,
      email,
      telephone,
      username,
      password: encryptedPassword,
    });
    response.json({ answer });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, telephone, username } = request.body;
    let client = await ClientModel.findById(id);

    if (!client) response.status(404);

    let newClient = await ClientModel.findByIdAndUpdate(
      id,
      { name, email, telephone, username },
      {
        new: true,
      }
    );

    response.send(newClient);
  }
}

export default ClientController;
