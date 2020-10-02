const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");

class Service extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo descrição deve ter entre 1 e 255 caracteres",
            },
          },
        },
        price: {
          type: Sequelize.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Preço precisa ser um número inteiro ou de ponto flutuante.",
            },
          },
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: "Em desenvolvimento...",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo status deve ter entre 1 e 255 caracteres",
            },
          },
        },
        limit_date: {
          type: Sequelize.DATE,
          defaultValue: "",
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (dev) => {
      const limitDate = new Date(dev.limit_date);
      console.log("----------> Datas: ", limitDate.getTime(), Date.now());
      if (limitDate.getTime() <= Date.now()) {
        throw new Error("Data limite menor que a data atual.");
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: "client_id" });
    this.belongsTo(models.Dev, { foreignKey: "dev_id" });
  }
}

module.exports = Service;
