const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const jwtSecret = process.env.JWT_SECRET;

const getTeacherByToken = async (token) => {
  if (!token) {
    return res.status(201).json({ message: "Acesso negado." });
  }

  const decoded = jwt.verify(token, jwtSecret);

  const userId = decoded.id;

  const user = await Teacher.findOne({ where: { id: userId } });
  return user;
};

module.exports = getTeacherByToken;
