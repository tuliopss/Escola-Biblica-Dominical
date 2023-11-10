import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetails.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
const TurmaDetails = () => {
  const [turma, setTurma] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
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
  }, [alunos]);

  const addAlunos = async () => {
    let msgType = "success";
    let msgText = "Alunos inseridos com sucesso.";

    try {
      const response = await api.post("/classroom/insertStudents");
      const alunos = response.data;

      setAlunos(alunos);
    } catch (error) {
      msgText = "error";
      msgText = "Houve um erro, tente novamente mais tarde.";
    }

    setFlashMessage(msgText, msgType);
  };

  return (
    <>
      {turma.disciplina && (
        <section className={styles.turma_details_container}>
          <div className={styles.turma_details_header}>
            <h1>
              Turma {turma.id}: {turma.disciplina}
            </h1>
            <button onClick={addAlunos}>Atualizr alunos dessa turma</button>
            <h3>Alunos inseridos nessa turma: </h3>
          </div>

          <div className='students_container'>
            {Array.isArray(alunos) &&
              alunos.map((aluno) => <p key={aluno.id}>{aluno.nome}</p>)}
            {alunos.length === 0 && <p>Não há alunos nessa turma...</p>}
          </div>
        </section>
      )}
    </>
  );
};

export default TurmaDetails;
