import React, { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import api from "../utils/api";
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

  return (
    <div className={styles.overview}>
      <div className={styles.students_card}>
        <span>{alunos.length}</span> <p>ALUNOS</p>
      </div>
      <div className={styles.teachers_card}>
        <span>3</span> <p>PROFESSORES</p>
      </div>
      <div className={styles.classes_card}>
        <span>{turmas.length}</span> <p>TURMAS</p>
      </div>
    </div>
  );
};

export default Overview;
