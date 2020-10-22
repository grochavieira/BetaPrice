const clientThreads = require("../threads/clientThreads");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (client) => {
  console.log(process.env.SECRET_KEY);
  return jwt.sign(
    {
      id: client.id,
      name: client.name,
      email: client.email,
      username: client.username,
      avatar_url: client.avatar_url,
      telephone: client.telephone,
      user_type: "client",
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

class ClientController {
  async index(request, response) {
    try {
      const clients = await clientThreads({ route: "index" });
      response.json(clients);
    } catch (e) {
      console.log(e);
      response.status(404).json({
        errors: {
          message: "Não foi possível listar os clientes.",
        },
      });
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
      response.status(404).json({
        errors: {
          message: "Não foi possível realizar a pesquisa.",
        },
      });
    }
  }

  async store(request, response) {
    try {
      const newClient = await clientThreads({
        route: "store",
        client: request.body,
      });

      if (newClient.errors) {
        return response.status(400).json(newClient);
      }

      console.log(newClient);

      const token = generateToken(newClient);
      newClient.token = token;

      response.status(200).json(newClient);
    } catch (e) {
      console.log(e);
      return response.status(400).json({
        errors: {
          message: "Não foi possível concluir o cadastro do cliente.",
        },
      });
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

      if (clientUpdated.errors) {
        return response.status(400).json(clientUpdated);
      }

      return response.status(200).json(clientUpdated);
    } catch (e) {
      console.log(e);
      return response.status(404).json({
        errors: ["email já existe"],
      });
    }
  }
}

module.exports = ClientController;
