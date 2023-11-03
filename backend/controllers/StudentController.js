const Student = require("../models/Student");
const db = require("../db/conn");
const jwt = require("jsonwebtoken");
const Classroom = require("../models/Classroom");
const jwtSecret = process.env.JWT_SECRET;

module.exports = class StudentController {
  static async InsertStudent(req, res) {
    const { nome, email, serie } = req.body;

    const checkEmail = await Student.findOne({ where: { email: email } });

    if (checkEmail) {
      res.status(404).json({ error: "Email já existente." });
      return;
    }
    const student = {
      nome,
      email,
      serie,
      presenca: false,
      //false para aluno faltou. ja começa como falta. o banco salva false como 0, e true como 1
    };

    try {
      const studentCreated = await Student.create(student);
      // const token = StudentController.generateToken(studentCreated.id);
      res.status(201).json(studentCreated);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Houve um erro. Tente novamente mais tarde." });
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await Student.findAll({ raw: true });

      res.status(200).json(students);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async deleteStudent(req, res) {
    const id = req.params.id;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ errors: ["Estudante não encontrado."] });
      return;
    }

    await Student.destroy({ where: { id: student.id } });

    res.status(200).json({ message: "Usuário deletado com sucesso." });
  }

  static async getStudentById(req, res) {
    const id = req.params.id;
    console.log(id);

    try {
      const student = await Student.findByPk(id);

      if (!student) {
        res.status(400).json({ errors: ["Estudante não encontrado"] });
        return;
      }

      res.status(200).json(student);
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houveu um erro, tente novamente mais tarde"] });
    }
  }

  static async updateStudent(req, res) {
    const id = req.params.id;
    const { nome, serie } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ errors: ["Estudante não encontrado."] });
      return;
    }

    const updatedStudent = { nome, serie };

    try {
      await Student.update(updatedStudent, { where: { id: id } });

      res.status(200).json({ message: "Estudante atualizado com sucesso." });
    } catch (error) {
      res
        .status(404)
        .json({ errors: ["Houveu um erro, tente novamente mais tarde"] });
    }
  }

  static async studentPresence(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    student.presenca = !student.presenca;
    await student.save();
    // await Student.update(student, { where: { id: id } });

    res.status(200).json({ message: "Presença confirmada." });
  }
};
