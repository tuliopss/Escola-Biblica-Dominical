import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import styles from "./TurmaDetails.module.css";
const TurmaDetails = () => {
  const [turma, setTurma] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/classroom/${id}`).then((response) => {
      setTurma(response.data);
    });
  }, [id]);

  useEffect(() => {
    api.get(`/classroom/${id}/students`).then((response) => {
      setAlunos(response.data);
    });
  }, []);

  return (
    <>
      {turma.disciplina && (
        <section className={styles.turma_details_container}>
          <div className={styles.turma_details_header}>
            <h1>
              Turma {turma.id}: {turma.disciplina}
            </h1>
            <h3>Alunos inseridos nessa turma: </h3>
          </div>

          <div className='students_container'>
            {alunos.map((aluno) => (
              <p>{aluno.nome}</p>
            ))}
            {alunos.length === 0 && <p>Não há alunos nessa turma...</p>}
          </div>
        </section>
      )}
    </>
  );
};

export default TurmaDetails;
