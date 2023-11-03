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
  const token = authHeader && authHeader.split(" ")[1]; // TOKEN EXAMPLE: Bearer djar3uieo3koddka. Split separa em um array e pega o [1]

  //check if a header has a token
  if (!token) {
    res.status(401).json({ errors: ["Acesso negado!"] });
    return;
  }

  //check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);
    // console.log("VERIFIED: ", verified);
    const teacher = await Teacher.findByPk(verified.id);

    if (teacher) {
      // Remova a senha do objeto antes de enviar a resposta
      teacher.password = undefined;
      req.teacher = teacher;
      next();
    }
    // req.user = await Teacher.findOne({ where: { id: verified.id } });
    // req.teacher = await Teacher.findByPk(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = authGuard;
