const DevModel = require("../models/DevModel");
const devThreads = require("../threads/devThreads");
const bcryptjs = require("bcryptjs");

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
        response.json("Desenvolvedor não existe!");
        return;
      }

      response.json(dev);
    } catch (e) {
      response.json("Não foi possível realizar a pesquisa.");
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;

      const dev = await devThreads({ route: "login", email });

      console.log(dev);

      if (!dev) {
        response.json("Usuário não existe");
        return;
      }

      if (!bcryptjs.compareSync(password, dev.password)) {
        response.json("Senha inválida");
        return;
      }

      response.json(dev);
    } catch (e) {
      response.json("Não foi possível realizar o login.");
    }
  }

  async create(request, response) {
    try {
      const {
        name,
        email,
        telephone,
        technologies,
        portfolio,
        bio,
        avatar_url,
        username,
        password,
      } = request.body;

      const techsArray = technologies.split(",").map((tech) => tech.trim());

      const salt = bcryptjs.genSaltSync();
      const encryptedPassword = bcryptjs.hashSync(password, salt);

      const dev = {
        name,
        email,
        telephone,
        technologies: techsArray,
        portfolio,
        bio,
        avatar_url,
        username,
        password: encryptedPassword,
        stars: "0",
      };

      const feedback = await devThreads({ route: "create", dev });

      response.json(feedback);
    } catch (e) {
      response.json("Não foi possível criar um novo dev.");
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
        email,
        telephone,
        technologies,
        portfolio,
        bio,
        avatar_url,
        username,
      } = request.body;

      const dev = await devThreads({ route: "show", id });

      if (!dev) return response.status(404).json({ error: "Dev não existe." });

      const techsArray = technologies.split(",").map((tech) => tech.trim());

      const updatedDev = {
        name,
        email,
        telephone,
        technologies: techsArray,
        portfolio,
        bio,
        avatar_url,
        username,
      };

      const feedback = await devThreads({
        route: "update",
        id,
        updatedDev,
      });

      response.json(feedback);
    } catch (e) {
      response.json("Não foi possível atualizar o perfil do dev.");
    }
  }
}

module.exports = DevController;
