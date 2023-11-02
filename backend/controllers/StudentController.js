const Student = require("../models/Student");
const db = require("../db/conn");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = class StudentController {
  static generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
      expiresIn: "7d",
    });
  };

  static async helloWorld(req, res) {
    res.status(200).json({ hello: "hello world" });
  }

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

  static async getCurrentUser(req, res) {
    const teacher = req.teacher;

    res.status(200).json(teacher);
  }
};
