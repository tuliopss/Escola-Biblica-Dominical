const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/StudentController");

const validate = require("../middlewares/handleValidation");
const studentsInsertValidations = require("../middlewares/studentsValidations");
const authGuard = require("../middlewares/authGuard");

router.get("/", StudentController.getAllStudents);
router.get("/:id", authGuard, StudentController.getStudentById);

router.post(
  "/create",
  studentsInsertValidations(),
  validate,
  authGuard,
  StudentController.InsertStudent
);

router.delete("/delete/:id", authGuard, StudentController.deleteStudent);
router.patch("/update/:id", authGuard, StudentController.updateStudent);
router.patch("/presence/:id", authGuard, StudentController.studentPresence);
// router.del ete("/:id", authGuard, StudentController.deleteStudent);

module.exports = router;
