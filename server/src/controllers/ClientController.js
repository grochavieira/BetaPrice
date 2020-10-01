const clientThreads = require("../threads/clientThreads");
const bcryptjs = require("bcryptjs");

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
        response.json("Cliente não existe!");
        return;
      }

      response.json(client);
    } catch (e) {
      response.json("Não foi possível realizar a pesquisa.");
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;

      const client = await clientThreads({ route: "login", email });

      console.log(client);

      if (!client) {
        response.json("Cliente não existe");
        return;
      }

      if (!bcryptjs.compareSync(password, client.password)) {
        response.json("Senha inválida");
        return;
      }

      response.json(client);
    } catch (e) {
      response.json("Não foi possível logar.");
    }
  }

  async create(request, response) {
    try {
      const { name, email, telephone, username, password } = request.body;

      const salt = bcryptjs.genSaltSync();
      const encryptedPassword = bcryptjs.hashSync(password, salt);

      const client = {
        name,
        email,
        telephone,
        username,
        password: encryptedPassword,
      };

      const answer = await clientThreads({ route: "create", client });

      response.json({ answer });
    } catch (e) {
      response.json("Não foi possível realizar o cadastro do cliente");
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, telephone, username } = request.body;

      const client = await clientThreads({ route: "show", id });

      if (!client) response.status(404);

      const updatedClient = {
        name,
        email,
        telephone,
        username,
      };

      const feedback = await clientThreads({
        route: "update",
        id,
        updatedClient,
      });

      response.json(feedback);
    } catch (e) {
      response.json("Não foi possível atualizar o cliente.");
    }
  }
}

module.exports = ClientController;
