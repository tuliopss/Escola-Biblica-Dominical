const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Student = require("./Student");
const Teacher = require("./Teacher");

const Class = db.define("class", {
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

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Student.hasMany(Class, { through: "Class_Students" });
Class.hasMany(Student, { through: "Class_Students" });

module.exports = Class;
