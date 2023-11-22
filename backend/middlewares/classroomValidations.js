const { body } = require("express-validator");

const classroomCreateValidations = () => {
  return [
    body("disciplina").isString().withMessage("A disciplina é obrigatória"),
    body("categoria").isString().withMessage("A categoria é obrigatória"),
  ];
};

module.exports = { classroomCreateValidations };
