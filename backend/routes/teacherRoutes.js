const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const TeacherController = require("../controllers/TeacherController");

const validate = require("../middlewares/handleValidation");

const {
  teacherCreateValidations,
  loginValidation,
} = require("../middlewares/teachersValidations");

router.get("/", authGuard, TeacherController.getAllTeachers);
router.get("/bySubject", TeacherController.getTeachersBySubject);
// router.get("/profile", authGuard, TeacherController.getCurrentUser);

router.post(
  "/register",
  teacherCreateValidations(),
  validate,
  TeacherController.register
);
router.post("/login", loginValidation(), validate, TeacherController.login);
//router.post("/createClass", authGuard, TeacherController.createClassroom);

module.exports = router;
