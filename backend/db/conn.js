const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("escola_biblica_dominical", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
