const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const ClientModel = require("../models/ClientModel");
const DevModel = require("../models/DevModel");
const connection = new Sequelize(dbConfig);

const models = [ClientModel, DevModel];

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

module.exports;
