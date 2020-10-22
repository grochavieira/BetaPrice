const devThreads = require("../threads/devThreads");
const DevModel = require("../models/DevModel");

class DevController {
  async index(request, response) {
    try {
      const devs = await devThreads({ route: "index" });
      response.status(200).json(devs);
    } catch (e) {
      response.status(404).json({
        errors: ["Não foi possível listar os desenvolvedores."],
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const dev = await devThreads({ route: "show", id });

      if (!dev) {
        response.status(400).json({
          errors: ["Desenvolvedor não existe!"],
        });
        return;
      }

      response.json(dev);
    } catch (e) {
      response.status(404).json({
        errors: ["Não foi possível realizar a pesquisa."],
      });
    }
  }

  async store(request, response) {
    try {
      const newDev = await devThreads({
        route: "store",
        dev: request.body,
      });

      if (newDev.errors) {
        return response.status(400).json(newDev);
      }

      response.status(200).json(newDev);
    } catch (e) {
      response.status(404).json({
        errors: ["Não foi possível criar um novo dev."],
      });
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

      if (updatedDev.errors) {
        return response.status(400).json(updatedDev);
      }

      return response.json(updatedDev);
    } catch (e) {
      response.status(404).json({
        errors: ["Não foi possível atualizar o perfil do dev."],
      });
    }
  }
}

module.exports = DevController;
