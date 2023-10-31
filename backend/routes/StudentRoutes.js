const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

router.get("/", StudentController.helloWorld);
router.post("/", StudentController.InsertStudent);

module.exports = router;
