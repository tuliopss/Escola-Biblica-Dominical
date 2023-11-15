import React, { useEffect, useState } from "react";
// import * as React from "react";
import Button from "@mui/material/Button";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetails.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox"; // Importe o Checkbox

const TurmaDetails = () => {
  const [turma, setTurma] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professor, setProfessor] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  // const columns = {[
  //   { field: 'username'},
  //   { field: 'age' },
  //   { field: 'desk' },
  // ]}

  const addAlunos = async () => {
    let msgType = "success";
    let msgText = "Alunos atualizados com sucesso.";

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

  const handlePresence = async (e) => {
    let msgType = "success";
    let msgText = "Alunos atualizados com sucesso.";

    try {
      const response = await api.patch("/student/presence/" + alunos.id);
      const alunos = response.data;

      setAlunos(alunos);
    } catch (error) {
      msgText = "error";
      msgText = "Houve um erro, tente novamente mais tarde.";
    }

    setFlashMessage(msgText, msgType);
  };

  useEffect(() => {
    api.get(`/classroom/${id}`).then((response) => {
      setTurma(response.data);
      setProfessor(response.data.professor);
      setAlunos(response.data.alunos);
    });
  }, [id]);

  // useEffect(() => {}, [id]);
  const handleCellClick = (e) => {
    console.log("click");
  };
  return (
    <>
      {turma.disciplina && (
        <section className={styles.turma_details_container}>
          <div className={styles.turma_info}>
            <h2>Dados da turma</h2>
            <p>Código da turma: {turma.id}</p>
            <p>Revista: {turma.disciplina}</p>
            <p>Categoria: {turma.categoria}</p>
            <p>
              Professor: {professor.nome} - {professor.email}
            </p>
          </div>
          <div className={styles.students_container}>
            <div className={styles.students_header}>
              <h3>Alunos inseridos nessa turma: </h3>

              <button className={styles.att_alunos_btn}>
                Atualizar alunos dessa turma
              </button>
            </div>
            <DataGrid
              rows={alunos}
              columns={[
                { field: "id", headerName: "ID", width: 100 },
                { field: "nome", headerName: "Nome", flex: 1, width: 200 },
                { field: "email", headerName: "Email", flex: 1, width: 200 },
                { field: "idade", headerName: "Idade", width: 100 },
                {
                  field: "presenca",
                  headerName: "Presença",
                  width: 120,
                  renderCell: (params) => (
                    <span style={{ color: params.value ? "green" : "red" }}>
                      {params.value ? "Presente" : "Ausente"}{" "}
                      <Checkbox
                        // checked={params.value}
                        onChange={async (e) => {
                          // Aqui você pode tratar a alteração de estado do Checkbox
                          const newAlunos = [...alunos];
                          const alunoIndex = newAlunos.findIndex(
                            (aluno) => aluno.id === params.id
                          );
                          newAlunos[alunoIndex].presenca = e.target.checked;

                          setAlunos(newAlunos);

                          try {
                            await api.patch(`student/presence/${id}`);
                          } catch (error) {}
                        }}
                        getRowId={(row) => row.id}
                        onCellClick={handleCellClick}
                      />
                    </span>
                  ),
                  editable: true,
                },
              ]}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TurmaDetails;
