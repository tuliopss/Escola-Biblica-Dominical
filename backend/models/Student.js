const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Student = db.define("aluno", {
  nome: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  serie: {
    type: DataTypes.INTEGER,
    require: true,
  },
  presenca: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Student;
