import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./AddTurma.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";

const EditAluno = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const getAluno = async () => {
    await api
      .get(`/student/${id}`)
      .then((response) => {
        setAluno(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getAluno();
  }, []);

  const updateAluno = async (aluno) => {
    let msgType = "success";
    let msgText = "Aluno editado com sucesso.";

    try {
      await api.patch(`/student/update/${id}`, aluno).then((response) => {
        return response.data;
      });
      setFlashMessage(msgText, msgType);
      navigate("/alunos/dashboard");
    } catch (error) {
      msgType = "error";
      msgText = error.response.data.errors[0];

      setFlashMessage(msgText, msgType);
    }
  };

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
    console.log(aluno);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAluno(aluno);
  };

  //className={FormStyles.form_container}
  return (
    <>
      <h2>Insira as informações do aluno:</h2>
      <form className={styles.form_addTurma} onSubmit={handleSubmit}>
        <div className={styles.form_field}>
          <label htmlFor='nome'>Nome do aluno</label>
          <input
            className='input'
            type='text'
            name='nome'
            placeholder='Nome'
            value={aluno.nome}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_field}>
          <label htmlFor='email'>Email do aluno</label>
          <input
            disabled
            className='input'
            type='email'
            name='email'
            placeholder='Email do aluno'
            value={aluno.email}
          />
        </div>

        <div className={styles.form_field}>
          <label htmlFor='idade'>Idade do aluno</label>
          <input
            className='input'
            type='number'
            name='idade'
            placeholder='Idade do aluno'
            min={2}
            value={aluno.idade}
            onChange={handleChange}
          />
        </div>
        <input
          className={styles.btn_submit_form}
          type='submit'
          value='Editar'
        />
      </form>
    </>
  );
};

export default EditAluno;
