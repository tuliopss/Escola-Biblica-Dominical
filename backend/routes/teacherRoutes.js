const express = require("express");
const router = express.Router();

const TeacherController = require("../controllers/TeacherController");

const validate = require("../middlewares/handleValidation");
const teacherCreateValidations = require("../middlewares/teachersValidations");
router.get("/", (req, res) => res.send("oi teacher"));
router.post(
  "/",
  teacherCreateValidations(),
  validate,
  TeacherController.register
);

module.exports = router;
