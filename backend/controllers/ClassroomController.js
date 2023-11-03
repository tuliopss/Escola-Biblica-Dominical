const Classroom = require("../models/Classroom");
const Student = require("../models/Student");

module.exports = class ClassroomController {
  static async getAllClasses(req, res) {
    try {
      const classrooms = await Classroom.findAll({ raw: true });

      res.status(200).json(classrooms);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  // static async insertStudentIntoClass(req, res) {
  //   const idClassroom = req.params.id;
  //   const studentID = req.body.studentID;
  //   const students = await Student.findAll({ raw: true });
  //   const insertedStudent = await Student.findByPk(studentID);

  //   res.json({ idClass: idClassroom, insertedStudent: insertedStudent });
  //   //await Classroom.create;
  // }
};
