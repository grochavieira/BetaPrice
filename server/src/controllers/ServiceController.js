const ServiceModel = require("../models/ServiceModel");
const DevModel = require("../models/DevModel");
const ClientModel = require("../models/ClientModel");
const serviceThreads = require("../threads/serviceThreads");

class ServiceController {
  async index(request, response) {
    try {
      const services = await serviceThreads({ route: "index" });

      response.json(services);
    } catch (e) {
      console.log(e);
      return response
        .status(400)
        .json({ error: "Não foi possível listar os serviços" });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ["Faltando ID"],
        });
      }

      const service = await serviceThreads({ route: "show", id });

      if (!service) {
        return response.status(400).json({
          errors: ["ID não existe"],
        });
      }

      return response.json(service);
    } catch (e) {
      console.log(e);
      return response.status(400).json({
        errors: "não foi possível pegar os dados do serviço",
      });
    }
  }

  async store(request, response) {
    try {
      const {
        dev_id,
        client_id,
        description,
        price,
        limit_date,
      } = request.body;

      const date = new Date(limit_date);

      const service = {
        dev_id,
        client_id,
        description,
        price,
        limit_date: date,
      };

      const newService = await serviceThreads({ route: "store", service });

      response.json(newService);
    } catch (e) {
      console.log(e);
      response.json("Não foi possível criar um novo serviço.");
    }
  }
  async update(request, response) {
    try {
      const { id } = request.params;
      const updatedService = await serviceThreads({
        route: "update",
        id,
        updatedService: request.body,
      });

      return response.json(updatedService);
    } catch (e) {
      console.log(e);
      response.json("Não foi possível atualizar o perfil do dev.");
    }
  }
}

module.exports = ServiceController;
