import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import styles from "./TurmaDetails.module.css";

import { DataGrid } from "@mui/x-data-grid";

const DetalhesAluno = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState({});
  const [professor, setProfessor] = useState({});
  const [turmas, setTurmas] = useState([]);

  const getAluno = async () => {
    api
      .get(`/student/${id}`)
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

  useEffect(() => {
    getAluno();
  }, []);

  if (!aluno || Object.keys(aluno).length === 0) {
    return <div>Carregando detalhes do aluno...</div>;
  }

  // const detalhesAluno = {
  //   id: aluno.id,
  //   nome: aluno.nome,
  //   email: aluno.email,
  //   idade: aluno.idade,
  //   categoria: aluno.categoria,
  //   // Adicione outras informações do aluno conforme necessário
  // };

  // const columns = [
  //   { field: "campo", headerName: "Campo", width: 150 },
  //   { field: "valor", headerName: "Valor", width: 250 },
  // ];

  // const rows = Object.keys(detalhesAluno).map((campo) => ({
  //   id: campo,
  //   campo,
  //   valor: detalhesAluno[campo],
  // }));

  return (
    <>
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
    </>
  );
};

export default DetalhesAluno;
