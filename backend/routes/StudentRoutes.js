const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/StudentController");

const validate = require("../middlewares/handleValidation");
const studentsInsertValidations = require("../middlewares/studentsValidations");
const authGuard = require("../middlewares/authGuard");

router.get("/", StudentController.getAllStudents);
router.get("/:id", authGuard, StudentController.getStudentById);
router.get("/profile", authGuard, StudentController.getCurrentUser);
router.post(
  "/",
  studentsInsertValidations(),
  validate,
  StudentController.InsertStudent
);
router.delete("/delete/:id", StudentController.deleteStudent);
// router.del ete("/:id", authGuard, StudentController.deleteStudent);

module.exports = router;
