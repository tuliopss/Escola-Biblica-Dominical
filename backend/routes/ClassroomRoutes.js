const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const ClassroomController = require("../controllers/ClassroomController");

const {
  classroomCreateValidations,
} = require("../middlewares/classroomValidations");
const validate = require("../middlewares/handleValidation");

router.get("/", authGuard, ClassroomController.getAllClasses);
router.get("/:id", authGuard, ClassroomController.getClassroomById);
router.get(
  "/:id/students",
  authGuard,
  ClassroomController.getStudentsFromClass
);
router.post(
  "/createClassroom",
  authGuard,
  classroomCreateValidations(),
  validate,
  ClassroomController.createClassroom
);

router.post(
  "/insertStudents",
  authGuard,
  ClassroomController.insertStudentIntoClassByCategory
);
router.post(
  "/insertTeacher/:id",
  authGuard,
  ClassroomController.insertTeacherIntoClass
);

router.delete(
  "/deleteClassroom/:id",
  authGuard,
  ClassroomController.deleteClassroom
);
router.delete(
  "/deleteStudent/:id",
  authGuard,
  ClassroomController.removeStudentFromClass
);

module.exports = router;
