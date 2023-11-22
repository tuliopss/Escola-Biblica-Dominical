const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Teacher = db.define("professor", {
  nome: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
  disciplina: {
    type: DataTypes.ENUM([
      "Etica",
      "Teologia",
      "Evangelho",
      "Criacao",
      "Historia",
    ]),
  },
});

module.exports = Teacher;
