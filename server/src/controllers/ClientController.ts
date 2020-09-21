import { Request, Response } from "express";
import ClientModel, { IClientModel } from "../models/ClientModel";
const bcryptjs = require("bcryptjs");

class ClientController {
  async index(request: Request, response: Response) {
    try {
      const clients = await ClientModel.find();

      response.send(clients);
    } catch (e) {
      response.send("Não foi possível listar os clientes.");
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const client = await ClientModel.findById(id);

      if (!client) {
        response.send("Cliente não existe!");
        return;
      }

      response.send(client);
    } catch (e) {
      response.send("Não foi possível realizar a pesquisa.");
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const client: IClientModel | null = await ClientModel.findOne({ email });

      console.log(client);

      if (!client) {
        response.send("Cliente não existe");
        return;
      }

      if (!bcryptjs.compareSync(password, client.password)) {
        response.send("Senha inválida");
        return;
      }

      response.send(client);
    } catch (e) {
      response.send("Não foi possível logar.");
    }
  }

  async create(request: Request, response: Response) {
    try {
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
    } catch (e) {
      response.send("Não foi possível realizar o cadastro do cliente");
    }
  }

  async update(request: Request, response: Response) {
    try {
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
    } catch (e) {
      response.send("Não foi possível atualizar o cliente.");
    }
  }
}

export default ClientController;
