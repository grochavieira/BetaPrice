const ClientModel = require("../models/ClientModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
require("../database");

async function clientThreads(workerData) {
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
    const clients = await ClientModel.findAll({
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "telephone",
        "avatar_url",
      ],
    });
    return deepCopy(clients);
  },
  show: async ({ id }) => {
    const client = await ClientModel.findByPk(id);
    const {
      id: client_id,
      name,
      telephone,
      username,
      avatar_url,
      email,
    } = client;
    return deepCopy({
      id: client_id,
      name,
      telephone,
      username,
      avatar_url,
      email,
    });
  },
  store: async ({ client }) => {
    try {
      const newClient = await ClientModel.create(client);
      const { id, name, telephone, username, avatar_url, email } = newClient;
      return deepCopy({ id, name, telephone, username, avatar_url, email });
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return deepCopy({ errors: [errors] });
    }
  },
  update: async ({ id, updatedClient }) => {
    try {
      const client = await ClientModel.findByPk(id);

      if (!client) {
        return {
          errors: ["usuário não existe."],
        };
      }

      const newData = await client.update(updatedClient);
      const {
        id: client_id,
        name,
        telephone,
        username,
        avatar_url,
        email,
      } = newData;

      return deepCopy({
        id: client_id,
        name,
        telephone,
        username,
        avatar_url,
        email,
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

module.exports = clientThreads;
