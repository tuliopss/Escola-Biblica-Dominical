const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const ClassroomController = require("../controllers/ClassroomController");

const {
  classroomCreateValidations,
} = require("../middlewares/classroomValidations");
const validate = require("../middlewares/handleValidation");

router.get("/", authGuard, ClassroomController.getAllClasses);
<<<<<<< HEAD
=======
router.get("/:id", authGuard, ClassroomController.getClassroomById);
>>>>>>> af0de3cbe67a7b8a99c75b4dc5695aaa04afd2d8
router.get(
  "/:id/students",
  authGuard,
  ClassroomController.getStudentsFromClass
);
router.post(
<<<<<<< HEAD
  "/insertStudent/:id",
  authGuard,
  ClassroomController.insertStudentIntoClass
=======
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
>>>>>>> af0de3cbe67a7b8a99c75b4dc5695aaa04afd2d8
);
router.delete(
  "/deleteStudent/:id",
  authGuard,
  ClassroomController.removeStudentFromClass
);

module.exports = router;
