const Classroom = require("../models/Classroom");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = class ClassroomController {
  static async getAllClasses(req, res) {
    try {
      const classrooms = await Classroom.findAll({
        // raw: true,
        include: Teacher,
      });

      res.status(200).json(classrooms);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async getClassroomById(req, res) {
    const id = req.params.id;

    try {
      const classroom = await Classroom.findOne({
        where: { id: id },
        include: Student,
      });

      if (!classroom) {
        res.status(400).json({ errors: ["Turma não encontrada."] });
      }

      res.status(200).json(classroom);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async createClassroom(req, res) {
    const { disciplina, teacherID } = req.body;

    const insertedTeacher = await Teacher.findByPk(teacherID);

    if (!insertedTeacher) {
      res.status(404).json({ errors: ["Professor não encontrado."] });
      return;
    }
    const newClassroom = {
      disciplina,
      professorId: insertedTeacher.id,
    };

    try {
      await Classroom.create(newClassroom);
      console.log(insertedTeacher);

      res.status(201).json(newClassroom);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async insertTeacherIntoClass(req, res) {
    const idClassroom = req.params.id;
    const teacherID = req.body.teacherID;

    try {
      const classroom = await Classroom.findByPk(idClassroom);

      if (!classroom) {
        res.status(404).json({ errors: ["Turma não encontrada."] });
        return;
      }

      const insertedTeacher = await Teacher.findByPk(teacherID);

      if (!insertedTeacher) {
        res.status(404).json({ errors: ["Professor não encontrado."] });
        return;
      }
      await classroom.setProfessor(insertedTeacher);

      res.status(200).json({ message: "Professor inserido com sucesso" });
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
