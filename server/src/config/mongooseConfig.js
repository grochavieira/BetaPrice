const mongoose = require("mongoose");
require("dotenv").config();

class MgConfig {
  createConnection() {
    mongoose
      .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Conectei a base de dados.");
      })
      .catch((e) => console.log(e));
  }

  removeConnection() {
    mongoose
      .disconnect()
      .then(() => {
        console.log("Desconectei da base de dados.");
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = new MgConfig();
