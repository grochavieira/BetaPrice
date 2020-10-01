const ClientModel = require("../models/ClientModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const mgConfig = require("../config/mongooseConfig");

async function clientThreads(workerData) {
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
    let clients = await ClientModel.find();
    return deepCopy(clients);
  },
  show: async ({ id }) => {
    let client = await ClientModel.findById(id);
    return deepCopy(client);
  },
  login: async ({ email }) => {
    const client = await ClientModel.findOne({ email });
    return deepCopy(client);
  },
  create: async ({ client }) => {
    const response = await ClientModel.create(client);
    console.log("response", response);
    return deepCopy(response);
  },
  update: async ({ id, updatedClient }) => {
    let response = await ClientModel.findByIdAndUpdate(id, updatedClient, {
      new: true,
    });
    return deepCopy(response);
  },
};

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

module.exports = clientThreads;
