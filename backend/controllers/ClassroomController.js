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

  static async insertStudentIntoClass(req, res) {
    const idClassroom = req.params.id;
    const studentID = req.body.studentID;

    try {
      const classroom = await Classroom.findByPk(idClassroom);

      if (!classroom) {
        res.status(404).json({ errors: ["Turma não encontrada."] });
        return;
      }

      const insertedStudent = await Student.findByPk(studentID);

      if (!insertedStudent) {
        res.status(404).json({ errors: ["Estudante não encontrado."] });
        return;
      }
      await classroom.addAlunos(insertedStudent);

      res.status(200).json({ message: "Aluno inserido com sucesso" });
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async getStudentsFromClass(req, res) {
    const idClassroom = req.params.id;

    const classroom = await Classroom.findOne({
      where: { id: idClassroom },
      include: Student,
    });

    if (!classroom) {
      res.status(404).json({ errors: ["Turma não encontrada."] });
      return;
    }

    res.status(200).json(classroom.alunos);
  }

  static async removeStudentFromClass(req, res) {
    const idClassroom = req.params.id;
    const studentID = req.body.studentID;

    try {
      const classroom = await Classroom.findByPk(idClassroom);

      if (!classroom) {
        res.status(404).json({ errors: ["Turma não encontrada."] });
        return;
      }

      const deletedStudent = await Student.findOne({
        where: { id: studentID },
        include: Classroom,
      });

      if (!deletedStudent) {
        res.status(404).json({ errors: ["Estudante não encontrado."] });
        return;
      }

      await classroom.removeAlunos(deletedStudent);

      res
        .status(200)
        .json({ message: "Estudante removido da turma com sucesso." });
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }
};
