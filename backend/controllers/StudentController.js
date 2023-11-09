const Student = require("../models/Student");
const db = require("../db/conn");
const jwt = require("jsonwebtoken");
const Classroom = require("../models/Classroom");
const jwtSecret = process.env.JWT_SECRET;

module.exports = class StudentController {
  static checkCategory(idade) {
    let category = "";

    if (idade >= 2 && idade <= 8) {
      category = "Principiantes";
    } else if (idade >= 9 && idade <= 12) {
      category = "Juniores";
    } else if (idade >= 13 && idade <= 17) {
      category = "Adolescentes";
    } else if (idade >= 18 && idade <= 35) {
      category = "Jovens";
    } else if (idade > 35) {
      category = "Adultos";
    }

    return category;
  }

  static async InsertStudent(req, res) {
    const { nome, email, idade } = req.body;

    const checkEmail = await Student.findOne({ where: { email: email } });

    if (checkEmail) {
      res.status(404).json({ error: "Email já existente." });
      return;
    }
    const student = {
      nome,
      email,
      idade,
      categoria: StudentController.checkCategory(idade),
      presenca: false,
      //false para aluno faltou. ja começa como falta. o banco salva false como 0, e true como 1
    };

    try {
      const studentCreated = await Student.create(student);
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
    const { nome, idade } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ errors: ["Estudante não encontrado."] });
      return;
    }

    const updatedStudent = {
      nome,
      idade,
      categoria: StudentController.checkCategory(idade),
    };

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
