const ServiceModel = require("../models/ServiceModel");
const DevModel = require("../models/DevModel");
const ClientModel = require("../models/ClientModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const mgConfig = require("../config/mongooseConfig");

async function serviceThreads(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename);
    worker.postMessage(workerData);
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

if (!isMainThread) {
  mgConfig.createConnection();
  parentPort.once("message", async (workerData) => {
    const commandFunction = routeCommands[workerData.route];
    const response = await commandFunction(workerData);
    mgConfig.removeConnection();
    parentPort.postMessage(response);
  });
}

const routeCommands = {
  index: async (workerData) => {
    let services = await ServiceModel.find();
    return deepCopy(services);
  },
  show: async ({ id }) => {
    const service = await ServiceModel.findById(id);

    if (!service) {
      return { error: "Id do serviço não existe." };
    }

    const dev = await DevModel.findById(service.dev_id);
    delete dev.password;

    const client = await ClientModel.findById(service.client_id);
    delete client.password;

    return deepCopy({ service, dev, client });
  },
  create: async ({ service, dev_id, client_id }) => {
    const dev = await DevModel.findById(dev_id);

    if (!dev) {
      return { error: "Dev não existe." };
    }

    const client = await ClientModel.findById(client_id);

    if (!client) {
      return { error: "Cliente não existe." };
    }

    const response = await ServiceModel.create(service);

    return deepCopy(response);
  },
  update: async ({ id, updatedservice }) => {
    let response = await ServiceModel.findByIdAndUpdate(id, updatedservice, {
      new: true,
    });
    return deepCopy(response);
  },
};

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

module.exports = serviceThreads;
