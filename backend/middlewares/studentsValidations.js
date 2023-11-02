const { body } = require("express-validator");

const studentInsertValidations = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O nome precisa de no mínimo 2 caracteres"),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Insira um email válido"),
  ];
};

module.exports = studentInsertValidations;
