const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("escola_biblica_dominical", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// try {
//   sequelize.authenticate();
//   console.log("Banco conectado.");
// } catch (error) {
//   console.log("Não foi possivel conectar.");
// }

module.exports = sequelize;
