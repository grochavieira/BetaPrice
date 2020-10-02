const clientThreads = require("../threads/clientThreads");
const ClientModel = require("../models/ClientModel");

class ClientController {
  async index(request, response) {
    try {
      const clients = await clientThreads({ route: "index" });
      response.json(clients);
    } catch (e) {
      console.log(e);
      response.json({ msg: "Não foi possível listar os clientes." });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const client = await clientThreads({ route: "show", id });

      if (!client) {
        response.status(400).json("Cliente não existe!");
        return;
      }

      return response.json(client);
    } catch (e) {
      console.log(e);
      response.json({ msg: "Não foi possível realizar a pesquisa." });
    }
  }

  async store(request, response) {
    try {
      const newClient = await clientThreads({
        route: "store",
        client: request.body,
      });

      response.json(newClient);
    } catch (e) {
      return response
        .status(400)
        .json("Não foi possível concluir o cadastro do cliente.");
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const clientUpdated = await clientThreads({
        route: "update",
        id,
        updatedClient: request.body,
      });

      return response.json(clientUpdated);
    } catch (e) {
      console.log(e);
      return response.status(400).json({
        errors: ["email já existe"],
      });
    }
  }
}

module.exports = ClientController;
