const DevModel = require("../models/DevModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
require("../database");

async function devThreads(workerData) {
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
    console.log("Entrour");
    const devs = await DevModel.findAll({
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "technologies",
        "telephone",
        "bio",
        "avatar_url",
        "portfolio",
        "stars",
      ],
    });
    console.log("dev", devs);
    return deepCopy(devs);
  },
  show: async ({ id }) => {
    const dev = await DevModel.findByPk(id);
    const {
      id: dev_id,
      name,
      telephone,
      username,
      avatar_url,
      email,
      technologies,
      portfolio,
      stars,
    } = dev;
    return deepCopy({
      id: dev_id,
      name,
      telephone,
      username,
      avatar_url,
      email,
      technologies,
      portfolio,
      stars,
    });
  },
  store: async ({ dev }) => {
    try {
      const newDev = await DevModel.create(dev);
      const {
        id,
        name,
        telephone,
        username,
        avatar_url,
        email,
        technologies,
        portfolio,
        stars,
      } = newDev;
      return deepCopy({
        id,
        name,
        telephone,
        username,
        technologies,
        avatar_url,
        email,
        portfolio,
        stars,
      });
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return deepCopy({ errors: [errors] });
    }
  },
  update: async ({ id, updatedDev }) => {
    try {
      const dev = await DevModel.findByPk(id);

      if (!dev) {
        return {
          errors: ["desenvolvedor não existe."],
        };
      }

      const newData = await dev.update(updatedDev);
      const {
        id: dev_id,
        name,
        telephone,
        username,
        technologies,
        avatar_url,
        email,
        portfolio,
        stars,
      } = newData;

      return deepCopy({
        id: dev_id,
        name,
        telephone,
        username,
        technologies,
        avatar_url,
        email,
        portfolio,
        stars,
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

module.exports = devThreads;
