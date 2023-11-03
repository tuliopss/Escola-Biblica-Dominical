const Student = require("../models/Student");
const db = require("../db/conn");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = class StudentController {
  static async InsertStudent(req, res) {
    const { nome, email, serie } = req.body;

    // if (presenca === "on") {
    //   presenca = true;
    // } else {
    //   presenca = false;
    // }
    const student = {
      nome,
      email,
      serie,
    };

    try {
      const studentCreated = await Student.create(student);
      const token = StudentController.generateToken(studentCreated.id);
      res.status(201).json({
        student: studentCreated,
        id: studentCreated.id,
        token: token,
      });
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
  }

  static async getStudentById(req, res) {
    const id = req.params.id;

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

  static async getCurrentUser(req, res) {
    const teacher = req.teacher;

    res.status(200).json(teacher);
  }
};
