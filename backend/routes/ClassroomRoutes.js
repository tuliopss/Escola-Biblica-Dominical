const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const ClassroomController = require("../controllers/ClassroomController");

const validate = require("../middlewares/handleValidation");

router.get("/", authGuard, ClassroomController.getAllClasses);
router.get(
  "/:id/students",
  authGuard,
  ClassroomController.getStudentsFromClass
);
router.post(
  "/insertStudent/:id",
  authGuard,
  ClassroomController.insertStudentIntoClass
);
router.delete(
  "/deleteStudent/:id",
  authGuard,
  ClassroomController.removeStudentFromClass
);

module.exports = router;
