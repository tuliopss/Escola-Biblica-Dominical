const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

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
};
