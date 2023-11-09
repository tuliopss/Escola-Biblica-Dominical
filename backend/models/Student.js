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
  idade: {
    type: DataTypes.INTEGER,
    required: true,
  },
  categoria: {
    type: DataTypes.ENUM([
      "Principiantes",
      "Juniores",
      "Adolescentes",
      "Jovens",
      "Adultos",
    ]),
    required: true,
  },
  //   Principiantes - 2 a 8 anos
  // Juniores - 9 a 12
  // Adolescentes - 13 a 17
  // Jovens - 18 a 35
  // Adultos - 35+
  presenca: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Student;
