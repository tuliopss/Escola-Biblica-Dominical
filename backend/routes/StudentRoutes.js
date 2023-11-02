const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/StudentController");

const validate = require("../middlewares/handleValidation");
const studentsInsertValidations = require("../middlewares/studentsValidations");
const authGuard = require("../middlewares/authGuard");

router.get("/", authGuard, StudentController.helloWorld);
router.get("/profile", authGuard, StudentController.getCurrentUser);
router.post(
  "/",
  studentsInsertValidations(),
  validate,
  StudentController.InsertStudent
);

module.exports = router;
