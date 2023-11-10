import React, { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import api from "../utils/api";
import { Link } from "react-router-dom";
const Overview = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/classroom").then((response) => {
      setTurmas(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/student").then((response) => {
      setAlunos(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/teacher").then((response) => {
      setTeachers(response.data);
    });
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.students_card}>
        <Link to='/alunos/dashborad'>
          <span>{alunos.length}</span> <p>ALUNOS</p>
        </Link>
      </div>
      <div className={styles.teachers_card}>
        <Link>
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
