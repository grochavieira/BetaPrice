module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("services", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      limit_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "clients",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      dev_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "devs",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => queryInterface.dropTable("services"),
};
