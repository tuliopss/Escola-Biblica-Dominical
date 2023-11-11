const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const Classroom = require("../models/Classroom");
const Student = require("../models/Student");
const StudentController = require("./StudentController");

module.exports = class TeacherController {
  static generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
      expiresIn: "7d",
    });
  };

  static async register(req, res) {
    const { nome, email, password, disciplina } = req.body;

    //check if teacher already exists
    const teacher = await Teacher.findOne({ where: { email: email } });

    if (teacher) {
      res.status(422).json({ errors: ["Email já existente."] });
      return;
    }

    //password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newTeacher = {
      nome,
      email,
      password: passwordHash,
      disciplina,
    };

    try {
      await Teacher.create(newTeacher);
      const token = TeacherController.generateToken(newTeacher.id);

      res.status(201).json({ id: newTeacher.id, token: token });
    } catch (error) {
      res
        .status(400)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ where: { email: email } });

    if (!teacher) {
      res.status(404).json({ errors: ["Usuário não encontrado"] });
      return;
    }

    const checkPassword = await bcrypt.compare(password, teacher.password);

    if (!checkPassword) {
      res.status(422).json({ errors: ["Informe a senha correta"] });
      return;
    }

    res.status(201).json({
      id: teacher.id,
      token: TeacherController.generateToken(teacher.id),
    });
  }

  static async getCurrentUser(req, res) {
    const user = req.teacher;

    res.status(200).json(user);
  }

  static async getAllTeachers(req, res) {
    try {
      const teachers = await Teacher.findAll();

      res.status(200).json(teachers);
    } catch (error) {
      res
        .status(400)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }

  static async getTeachersBySubject(req, res) {
    const disciplina = req.query.disciplina;
    try {
      const teachers = await Teacher.findAll({
        where: {
          disciplina: disciplina,
        },
      });

      res.status(200).json(teachers);
    } catch (error) {
      res
        .status(400)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }
};
