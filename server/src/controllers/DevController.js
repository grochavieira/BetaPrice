const DevModel = require("../models/DevModel");
const bcryptjs = require("bcryptjs");

class DevController {
  async index(request, response) {
    try {
      const devs = await DevModel.find();

      response.send(devs);
    } catch (e) {
      response.send("Não foi possível listar os desenvolvedores.");
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const dev = await DevModel.findById(id);

      if (!dev) {
        response.send("Desenvolvedor não existe!");
        return;
      }

      response.send(dev);
    } catch (e) {
      response.send("Não foi possível realizar a pesquisa.");
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;

      const dev = await DevModel.findOne({ email });

      console.log(dev);

      if (!dev) {
        response.send("Usuário não existe");
        return;
      }

      if (!bcryptjs.compareSync(password, dev.password)) {
        response.send("Senha inválida");
        return;
      }

      response.send(dev);
    } catch (e) {
      response.send("Não foi possível realizar o login.");
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

      const answer = await DevModel.create({
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
      });
      response.json({ answer });
    } catch (e) {
      response.send("Não foi possível criar um novo dev.");
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
      let dev = await DevModel.findById(id);
      console.log(dev);
      if (!dev) response.status(404);

      const techsArray = technologies.split(",").map((tech) => tech.trim());

      let newDev = await DevModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          telephone,
          technologies: techsArray,
          portfolio,
          bio,
          avatar_url,
          username,
        },
        {
          new: true,
        }
      );

      response.send(newDev);
    } catch (e) {
      response.send("Não foi possível atualizar o perfil do dev.");
    }
  }
}

module.exports = DevController;
