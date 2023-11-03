// const Teacher = require("../models/Teacher");
// const jwt = require("jsonwebtoken");
// const jwt_secret = "123";
// // const jwt_secret = process.env.JWT_SECRET;
// const teste = process.env.JWT_SECRET;
// const authGuard = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

//   try {
//     const verified = jwt.verify(token, jwt_secret);
//     console.log(verified);
//     req.user = await Teacher.findByPk(verified.id).select("-password");
//     next();
//   } catch (error) {
//     if (!token) return res.status(401).json({ errors: ["Token inválido."] });
//   }
// };

// module.exports = authGuard;
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check if a header has a token
  if (!token) {
    res.status(401).json({ errors: ["Acesso negado!"] });
    return;
  }

  //check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);
    const teacher = await Teacher.findByPk(verified.id);

    // Remove password from the req
    if (teacher) {
      teacher.password = undefined;
      req.teacher = teacher;
      next();
    }
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = authGuard;
