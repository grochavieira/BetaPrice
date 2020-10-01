const DevModel = require("../models/DevModel");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const mgConfig = require("../config/mongooseConfig");

async function devThreads(workerData) {
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
    let devs = await DevModel.find();
    return deepCopy(devs);
  },
  show: async ({ id }) => {
    let dev = await DevModel.findById(id);
    return deepCopy(dev);
  },
  login: async ({ email }) => {
    const dev = await DevModel.findOne({ email });
    return deepCopy(dev);
  },
  create: async ({ dev }) => {
    const response = await DevModel.create(dev);
    console.log("response", response);
    return deepCopy(response);
  },
  update: async ({ id, updatedDev }) => {
    let response = await DevModel.findByIdAndUpdate(id, updatedDev, {
      new: true,
    });
    return deepCopy(response);
  },
};

const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

module.exports = devThreads;
