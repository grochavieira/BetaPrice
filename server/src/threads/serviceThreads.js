const DevModel = require("../models/DevModel");
const ServiceModel = require("../models/ServiceModel");
const ClientModel = require("../models/ClientModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
require("../database");

async function serviceThreads(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename);
    worker.postMessage(workerData);
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

if (!isMainThread) {
  parentPort.once("message", async (workerData) => {
    const commandFunction = routeCommands[workerData.route];
    const response = await commandFunction(workerData);
    parentPort.postMessage(response);
  });
}

const routeCommands = {
  index: async (workerData) => {
    const services = await ServiceModel.findAll({
      attributes: ["id", "status", "description", "limit_date"],
      order: [
        ["id", "DESC"],
        [DevModel, "id", "DESC"],
        [ClientModel, "id", "DESC"],
      ],
      include: [
        {
          model: DevModel,
          attributes: ["name", "avatar_url"],
        },
        {
          model: ClientModel,
          attributes: ["name", "avatar_url"],
        },
      ],
    });

    return deepCopy(services);
  },
  show: async ({ id }) => {
    const service = await ServiceModel.findByPk(id, {
      attributes: ["id", "status", "description", "limit_date"],
      order: [
        ["id", "DESC"],
        [DevModel, "id", "DESC"],
        [ClientModel, "id", "DESC"],
      ],
      include: [
        {
          model: DevModel,
          attributes: ["name", "avatar_url"],
        },
        {
          model: ClientModel,
          attributes: ["name", "avatar_url"],
        },
      ],
    });

    console.log(service);

    return deepCopy(service);
  },
  store: async ({ service }) => {
    try {
      const newService = await ServiceModel.create(service);
      return deepCopy(newService);
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return deepCopy({ errors: [errors] });
    }
  },
  update: async ({ id, updatedService }) => {
    try {
      const service = await ServiceModel.findByPk(id);

      if (!service) {
        return {
          errors: ["serviço não existe."],
        };
      }

      const newData = await service.update(updatedService);

      const { id: service_id, description, status, limit_date } = newData;

      return deepCopy({
        id: service_id,
        description,
        status,
        limit_date,
      });
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return deepCopy({ errors: [errors] });
    }
  },
};

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

module.exports = serviceThreads;
