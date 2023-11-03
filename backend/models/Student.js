const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Student = db.define("aluno", {
  nome: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  serie: {
    type: DataTypes.INTEGER,
    required: true,
  },
  presenca: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Student;
