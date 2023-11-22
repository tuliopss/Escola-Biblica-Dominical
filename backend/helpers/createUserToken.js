const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      nome: user.nome,
      id: user.id,
    },
    jwtSecret
  );

  res.status(201).json({
    message: "Você está autenticado!",
    token: token,
    userId: user.id,
  });
};

module.exports = createUserToken;
