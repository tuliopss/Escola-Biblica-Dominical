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
      "HISTORIA",
      "GEOGRAFIA",
      "PORTUGUES",
      "MATEMATICA",
      "Ciencias",
    ]),
    require: true,
  },
});

module.exports = Teacher;
