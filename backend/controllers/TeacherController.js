const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const Classroom = require("../models/Classroom");
const Student = require("../models/Student");
const StudentController = require("./StudentController");
const createUserToken = require("../helpers/createUserToken");

module.exports = class TeacherController {
  static generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
      expiresIn: "7d",
    });
  };

  static async register(req, res) {
    const { nome, email, password, disciplina } = req.body;

    //check if teacher already exists
    const checkEmail = await Teacher.findOne({ where: { email: email } });

    if (checkEmail) {
      res.status(422).json({ errors: ["Email já existente."] });
      return;
    }

    //password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      nome,
      email,
      password: passwordHash,
      disciplina,
    });

    try {
      const newTeacher = await teacher.save();
      // const token = TeacherController.generateToken(newTeacher.id);

      await createUserToken(newTeacher, req, res);
      // res.status(201).json({ message: "Conta criada" });
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

    // res.status(201).json({
    //   id: teacher.id,
    //   token: TeacherController.generateToken(teacher.id),
    // });
    await createUserToken(teacher, req, res);
  }

  static async updateTeacher(req, res) {
    const reqTeacher = req.teacher;
    const { nome, disciplina, password, confirmPassword } = req.body;

    const teacher = await Teacher.findByPk(reqTeacher.id, {
      attributes: { exclude: ["password"] },
    });

    if (nome) {
      teacher.nome = nome;
    }

    if (disciplina) {
      teacher.disciplina = disciplina;
    }

    if (password !== confirmPassword) {
      res.status(422).json({ errors: ["Senhas não coincidentes!"] });
      return;
    } else if (password === confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      teacher.password = passwordHash;
    }

    await teacher.save();

    res.status(200).json(teacher);
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

  static async getTeacherClasses(req, res) {
    const teacherId = req.params.id;

    try {
      const classrooms = await Classroom.findAll({
        where: { professorId: teacherId },
      });

      res.status(200).json(classrooms);
    } catch (error) {
      res
        .status(400)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  }
};
