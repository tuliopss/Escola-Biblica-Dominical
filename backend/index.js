const express = require("express");
const conn = require("./db/conn");
const cors = require("cors");
const exphbs = require("express-handlebars");
const Student = require("./models/Student");
const StudentsRoutes = require("./routes/StudentRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.engine("handlebars", exphbs.engine());
// app.set("view engine", "handlebars");

//Routes
app.use("/student", StudentsRoutes);
app.get("/", (req, res) => {
  res.render("adduser");
});
app.post("/users/create", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;

  await Student.create({ nome, email });

  console.log(req.body);

  res.redirect("/");
});

// conn
//   .sync()
//   .then(() => {
//     app.listen(port, () => {
//       console.log("Banco e Server on.");
//     });
//   })
//   .catch((error) => console.log(error));
conn
  //   .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));
