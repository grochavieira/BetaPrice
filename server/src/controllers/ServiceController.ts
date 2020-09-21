import { Request, Response } from "express";
import ServiceModel, { IServiceModel } from "../models/ServiceModel";
import DevModel, { IDevModel } from "../models/DevModel";
import ClientModel, { IClientModel } from "../models/ClientModel";

class ServiceController {
  async index(request: Request, response: Response) {
    try {
      const services = await ServiceModel.find();

      response.send(services);
    } catch (e) {
      response.send("Não foi possível criar o serviço");
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const service: IServiceModel | null = await ServiceModel.findById(id);

      if (!service) {
        response.send("Id do serviço não existe.");
        return;
      }

      const dev = await DevModel.findById(service.dev_id);

      const client = await ClientModel.findById(service.client_id);

      response.json({ service, client, dev });
    } catch (e) {
      response.send("Não foi possível criar o serviço!");
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { dev_id, client_id, description, price, limitDate } = request.body;

      const dev = await DevModel.findById(dev_id);

      const client = await ClientModel.findById(client_id);

      if (!dev) {
        response.send("Dev não existe.");
        return;
      }

      if (!client) {
        response.send("Cliente não existe.");
        return;
      }

      const service = await ServiceModel.create({
        dev_id,
        client_id,
        description,
        price,
        limitDate,
      });

      response.json({ service, client, dev });
    } catch (e) {
      response.send("Não foi possível criar o serviço");
    }
  }
}

export default ServiceController;
