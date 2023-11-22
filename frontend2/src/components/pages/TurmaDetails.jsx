import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetails.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";

const TurmaDetails = () => {
  const [turma, setTurma] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professor, setProfessor] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  const getClassroom = async () => {
    api
      .get(`/classroom/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTurma(response.data);
        setProfessor(response.data.professor);
        setAlunos(response.data.alunos);
      });
  };

  const renderStudents = async () => {
    await api.get(`/classroom/${id}/students`).then((response) => {
      setAlunos(response.data);
    });
  };

  const addAlunos = async () => {
    const insertStudents = await api
      .post("/classroom/insertStudents", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const newAlunos = [...alunos];
        setAlunos(newAlunos);
        return response.data;
      });
    renderStudents();
  };

  useEffect(() => {
    Promise.all([getClassroom(), renderStudents(), addAlunos()]).then(() => {
      console.log("functions on");
    });
  }, [id]);

  const handleAddAlunos = async () => {
    let msgType = "success";
    let msgText = "Alunos atualizados com sucesso.";

    try {
      addAlunos();
    } catch (error) {
      msgText = "error";
      msgText = "Houve um erro, tente novamente mais tarde.";
    }

    setFlashMessage(msgText, msgType);
  };

  const deleteTurma = async () => {
    let msgType = "success";
    let msgText;
    const data = await api
      .delete(`/classroom/deleteClassroom/${id}`)
      .then((response) => {
        navigate("/turmas");
        msgText = response.data.message;
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        // console.log(error.response.data.errors[0]);
        msgText = error.response.data.errors[0];
        // msgText = error.response.data.errors[0];
      });

    setFlashMessage(msgText, msgType);
    if (msgType != "error") {
      navigate("/turmas");
    }
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
            <div>
              <button className={styles.delete_btn} onClick={deleteTurma}>
                Excluir turma
              </button>
            </div>
          </div>

          <div className={styles.students_container}>
            <div className={styles.students_header}>
              <h3>Alunos inseridos nessa turma: </h3>

              <button
                className={styles.att_alunos_btn}
                onClick={handleAddAlunos}>
                Atualizar alunos dessa turma
              </button>
            </div>
            <DataGrid
              disableRowSelectionOnClick
              rows={alunos}
              columns={[
                { field: "id", headerName: "ID", flex: 0.2, width: 100 },
                { field: "nome", headerName: "Nome", flex: 1, width: 200 },
                { field: "email", headerName: "Email", flex: 2, width: 200 },
                { field: "idade", headerName: "Idade", width: 100 },
                {
                  field: "presenca",
                  headerName: "Presença",
                  width: 120,
                  renderCell: (params) => (
                    <span style={{ color: params.value ? "green" : "red" }}>
                      {params.value ? "Presente" : "Ausente"}{" "}
                      <Checkbox
                        checked={params.value}
                        onChange={async (e) => {
                          const newAlunos = [...alunos];
                          const alunoIndex = newAlunos.findIndex(
                            (aluno) => aluno.id === params.id
                          );
                          const alunoId = newAlunos[alunoIndex].id;
                          newAlunos[alunoIndex].presenca = e.target.checked;

                          setAlunos(newAlunos);

                          try {
                            await api.patch(`student/presence/${alunoId}`);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
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
