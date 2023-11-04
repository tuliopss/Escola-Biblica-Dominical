const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const ClassroomController = require("../controllers/ClassroomController");

const validate = require("../middlewares/handleValidation");

const {
  teacherCreateValidations,
  loginValidation,
} = require("../middlewares/teachersValidations");

router.get("/classrooms", authGuard, ClassroomController.getAllClasses);
router.post(
  "/insertStudent/:id",
  authGuard,
  ClassroomController.insertStudentIntoClass
);

module.exports = router;
