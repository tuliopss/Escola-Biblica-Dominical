// const { DataTypes } = require("sequelize");
// const db = require("../db/conn");
// const Student = require("./Student");
// const Teacher = require("./Teacher");

// const Class = db.define("turma", {
//   disciplina: {
//     type: DataTypes.ENUM([
//       "HISTORIA",
//       "GEOGRAFIA",
//       "PORTUGUES",
//       "MATEMATICA",
//       "Ciencias",
//     ]),
//     require: true,
//   },
// });

// Class.belongsTo(Teacher);
// Teacher.hasMany(Class);

// Student.belongsToMany(Class, { through: "Class_Students" });
// Class.belongsToMany(Student, { through: "Class_Students" });

// module.exports = Class;
const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const Student = require("./Student");
const Teacher = require("./Teacher");

const Classroom = db.define("turma", {
  disciplina: {
    type: DataTypes.ENUM([
      "HISTORIA",
      "GEOGRAFIA",
      "PORTUGUES",
      "MATEMATICA",
      "Ciencias",
    ]),
    required: true, // Correção aqui, de "require" para "required"
  },
});

Classroom.belongsTo(Teacher);
Teacher.hasMany(Classroom);

Student.belongsToMany(Classroom, { through: "Classroom_Students" });
Classroom.belongsToMany(Student, { through: "Classroom_Students" });

module.exports = Classroom;
