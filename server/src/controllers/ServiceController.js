const ServiceModel = require("../models/ServiceModel");
const DevModel = require("../models/DevModel");
const ClientModel = require("../models/ClientModel");
const serviceThreads = require("../threads/serviceThreads");

class ServiceController {
  async index(request, response) {
    try {
      const services = await serviceThreads({ route: "index" });

      response.send(services);
    } catch (e) {
      response.send("Não foi possível criar o serviço");
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      // const service = await ServiceModel.findById(id);

      // if (!service) {
      //   response.send("Id do serviço não existe.");
      //   return;
      // }

      // const dev = await DevModel.findById(service.dev_id);

      // const client = await ClientModel.findById(service.client_id);

      const serviceData = await serviceThreads({ route: "show", id });

      response.json(serviceData);
    } catch (e) {
      response.send("Não foi possível criar o serviço!");
    }
  }

  async create(request, response) {
    try {
      const {
        id,
        dev_id,
        client_id,
        description,
        price,
        limitDate,
      } = request.body;

      const service = {
        dev_id,
        client_id,
        description,
        price,
        limitDate,
      };

      const serviceData = await serviceThreads({
        route: "create",
        dev_id,
        client_id,
        service,
      });

      response.json(serviceData);
    } catch (e) {
      response.send("Não foi possível criar o serviço");
    }
  }
}

module.exports = ServiceController;
