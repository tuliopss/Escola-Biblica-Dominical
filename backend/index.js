require("dotenv").config();

const express = require("express");
const conn = require("./db/conn");
const cors = require("cors");

const studentsRoutes = require("./routes/StudentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classroomRoutes = require("./routes/ClassroomRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.engine("handlebars", exphbs.engine());
// app.set("view engine", "handlebars");

//Routes
app.use("/student", studentsRoutes);
app.use("/teacher", teacherRoutes);
app.use("/classroom", classroomRoutes);

conn
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
