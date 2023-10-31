const Student = require("../models/Student");
const db = require("../db/conn");

module.exports = class StudentController {
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
      await Student.create(student);

      res.status(201).json(student);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Houve um erro. Tente novamente mais tarde." });
    }
  }
};
