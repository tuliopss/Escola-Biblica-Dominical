import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import styles from "./TurmaDetails.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
import { DataGrid } from "@mui/x-data-grid";

const DetalhesAluno = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState({});
  const [professor, setProfessor] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");
  const [turmas, setTurmas] = useState([]);

  const getAluno = async () => {
    api
      .get(`/student/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAluno(response.data);
        setTurmas(response.data.turmas);
        setProfessor(response.data.turmas.professor);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do aluno:", error);
      });
  };

  const refreshTurma = async () => {
    await api.post("/classroom/insertStudents").then((response) => {
      const newTurmas = [...turmas];
      setTurmas(newTurmas);
      return response.data;
    });
    getAluno();
  };

  const handleRefresh = async () => {
    let msgType = "success";
    let msgText = "Turmas atualizadas com sucesso.";

    try {
      refreshTurma();
    } catch (error) {
      msgText = "error";
      msgText = "Houve um erro, tente novamente mais tarde.";
    }

    setFlashMessage(msgText, msgType);
  };

  useEffect(() => {
    getAluno();
  }, []);

  if (!aluno || Object.keys(aluno).length === 0) {
    return <div>Carregando detalhes do aluno...</div>;
  }

  return (
    <>
      {aluno && (
        <section className={styles.turma_details_container}>
          <div className={styles.turma_info}>
            <h2>Dados do aluno {aluno.nome}</h2>
            <p>E-mail: {aluno.email}</p>
            <p>Idade: {aluno.idade}</p>
            <p>Categoria: {aluno.categoria}</p>
          </div>

          <div className={styles.students_container}>
            <div className={styles.students_header}>
              <h3>Turmas em que o aluno está inserido: </h3>
              <button className={styles.att_alunos_btn} onClick={handleRefresh}>
                Atualizar turmas desse aluno
              </button>
            </div>
            <DataGrid
              disableRowSelectionOnClick
              rows={turmas}
              columns={[
                { field: "id", headerName: "ID", flex: 0.2, width: 100 },
                {
                  field: "disciplina",
                  headerName: "Disciplina",
                  flex: 1,
                  width: 200,
                },
                {
                  field: "professor",
                  headerName: "Professor",
                  flex: 2,
                  width: 200,
                  renderCell: (params) => {
                    return <span>{params.row.professor.nome}</span>;
                  },
                },
              ]}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default DetalhesAluno;
