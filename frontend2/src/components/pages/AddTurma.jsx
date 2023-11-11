import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

import styles from "./AddTurma.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";

const AddTurma = () => {
  const [turma, setTurma] = useState({});
  const [disciplina, setDisciplina] = useState();
  const [professores, setProfessores] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const disciplinas = ["Etica", "Teologia", "Evangelho", "Criacao", "Historia"];
  const categorias = [
    "Principiantes",
    "Juniores",
    "Adolescentes",
    "Jovens",
    "Adultos",
  ];

  useEffect(() => {
    api
      .get("/teacher/bySubject?disciplina=" + turma.disciplina)
      .then((response) => {
        setProfessores(response.data);
      });
  }, [turma]);

  const addTurma = async (turma) => {
    let msgType = "success";
    let msgText = "Turma criada com sucesso.";

    try {
      await api.post("/classroom/createClassroom", turma).then((response) => {
        return response.data;
      });
      setFlashMessage(msgText, msgType);
      navigate("/turmas");
    } catch (error) {
      msgType = "error";
      msgText = error.response.data.errors[0];

      setFlashMessage(msgText, msgType);
    }
  };

  const handleChange = (e) => {
    setTurma({ ...turma, [e.target.name]: e.target.value });
    console.log(turma);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTurma(turma);
  };

  //className={FormStyles.form_container}
  return (
    <form className={styles.form_addTurma} onSubmit={handleSubmit}>
      <div className={styles.form_field}>
        <label htmlFor='disciplina'>Nome da disciplina</label>
        <select className='input' onChange={handleChange} name='disciplina'>
          <option disabled selected>
            Selecione a disciplina
          </option>
          {disciplinas.map((disciplina) => (
            <option value={disciplina} key={disciplina}>
              {disciplina}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.form_field}>
        <label htmlFor='categoria'>Categoria da turma</label>
        <select className='input' onChange={handleChange} name='categoria'>
          <option disabled selected>
            Selecione a categoria
          </option>
          {categorias.map((categoria) => (
            <option value={categoria} key={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.form_field}>
        <label htmlFor='professor'>Insira um professor para essa turma</label>
        <select className='input' onChange={handleChange} name='teacherID'>
          <option disabled selected>
            Selecione
          </option>
          {professores.map((prof) => (
            <option value={prof.id} key={prof.id}>
              {prof.nome} - {prof.email}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.btn_submit_form} type='submit' />
    </form>
  );
};

export default AddTurma;
