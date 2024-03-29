const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const TeacherController = require("../controllers/TeacherController");

const validate = require("../middlewares/handleValidation");

const {
  teacherUpdateValidation,
  teacherCreateValidations,
  loginValidation,
} = require("../middlewares/teachersValidations");

router.get("/", authGuard, TeacherController.getAllTeachers);
router.get("/bySubject", authGuard, TeacherController.getTeachersBySubject);
router.get("/profile", authGuard, TeacherController.getCurrentUser);
router.get("/:id/classrooms", authGuard, TeacherController.getTeacherClasses);

router.post(
  "/register",
  teacherCreateValidations(),
  validate,
  TeacherController.register
);
router.post("/login", loginValidation(), validate, TeacherController.login);
router.patch(
  "/edit/:id",
  authGuard,
  teacherUpdateValidation(),
  validate,
  TeacherController.updateTeacher
);

module.exports = router;
