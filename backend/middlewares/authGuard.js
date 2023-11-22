// module.exports = authGuard;
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check if a header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  //check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);
    const teacher = await Teacher.findByPk(verified.id, {
      attributes: { exclude: ["password"] },
    });

    req.teacher = teacher;
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = authGuard;
