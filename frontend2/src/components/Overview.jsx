import React, { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import api from "../utils/api";
import { Link } from "react-router-dom";
const Overview = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getClassrooms = async () => {
    await api.get("/classroom").then((response) => {
      setTurmas(response.data);
    });
  };

  const getStudents = async () => {
    await api.get("/student").then((response) => {
      setAlunos(response.data);
    });
  };

  const getTeachers = async () => {
    await api.get("/teacher").then((response) => {
      setTeachers(response.data);
    });
  };

  useEffect(() => {
    Promise.all([getClassrooms(), getStudents(), getTeachers()]).then(() => {
      console.log("overview on");
    });
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.students_card}>
        <Link to='/alunos/dashboard'>
          <span>{alunos.length}</span> <p>ALUNOS</p>
        </Link>
      </div>
      <div className={styles.teachers_card}>
        <Link to='/professores'>
          <span>{teachers.length}</span> <p>PROFESSORES</p>
        </Link>
      </div>
      <div className={styles.classes_card}>
        <Link to='/turmas'>
          <span>{turmas.length}</span> <p>TURMAS</p>
        </Link>
      </div>
    </div>
  );
};

export default Overview;
