const devThreads = require("../threads/devThreads");
const DevModel = require("../models/DevModel");

class DevController {
  async index(request, response) {
    try {
      const devs = await devThreads({ route: "index" });
      response.json(devs);
    } catch (e) {
      response.json("Não foi possível listar os desenvolvedores.");
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const dev = await devThreads({ route: "show", id });

      if (!dev) {
        response.status(400).json("Desenvolvedor não existe!");
        return;
      }

      response.json(dev);
    } catch (e) {
      response.json("Não foi possível realizar a pesquisa.");
    }
  }

  async store(request, response) {
    try {
      const newDev = await devThreads({
        route: "store",
        dev: request.body,
      });

      response.json(newDev);
    } catch (e) {
      response.json("Não foi possível criar um novo dev.");
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const updatedDev = await devThreads({
        route: "update",
        id,
        updatedDev: request.body,
      });

      return response.json(updatedDev);
    } catch (e) {
      response.json("Não foi possível atualizar o perfil do dev.");
    }
  }
}

module.exports = DevController;
