const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");

class Dev extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo nome deve ter entre 1 e 255 caracteres",
            },
          },
        },
        username: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Nome de usuário já existe",
          },
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo usuário deve ter entre 1 e 255 caracteres",
            },
          },
        },
        portfolio: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo resumo deve ter entre 1 e 255 caracteres",
            },
          },
        },
        bio: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo portfólio deve ter entre 1 e 255 caracteres",
            },
          },
        },
        technologies: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Campo resumo deve ter entre 1 e 255 caracteres",
            },
          },
        },
        avatar_url: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        stars: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
        },
        telephone: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [9, 15],
              msg: "Campo telefone deve ter entre 9 e 15 caracteres",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "A senha precisa ter entre 6 e 50 caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (dev) => {
      if (dev.password) {
        dev.password_hash = await bcryptjs.hash(dev.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = Dev;
