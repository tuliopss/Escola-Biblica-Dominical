import api from "../../utils/api";

import { useState, useEffect, useLayoutEffect } from "react";

import styles from "./Profile.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";

const Profile = () => {
  const [user, setUser] = useState({});
  const [turmas, setTurmas] = useState([]);

  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const disciplinas = ["Etica", "Teologia", "Evangelho", "Criacao", "Historia"];

  // const getTeacherProfile = async () => {
  //   try {
  //     const response = await api.get("/teacher/profile", {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`,
  //       },
  //     });

  //     setUser(response.data);
  //     await getTeacherClassrooms();
  //   } catch (error) {}
  // };

  // const getTeacherClassrooms = async () => {
  //   try {
  //     const response = await api.get(`/teacher/${user.id}/classrooms`, {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`,
  //       },
  //     });

  //     setTurmas(response.data);
  //     console.log(response.data.length);
  //   } catch (error) {}
  // };
  const getTeacherProfile = async () => {
    try {
      const response = await api.get("/teacher/profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setUser(response.data);
      await getTeacherClassrooms(response.data.id);
    } catch (error) {
      console.error("Erro ao obter perfil do professor:", error);
    }
  };

  const getTeacherClassrooms = async (id) => {
    try {
      const response = await api.get(`/teacher/${id}}/classrooms`);
      const classrooms = response.data;
      setTurmas(classrooms);
    } catch (error) {
      console.error("Erro ao obter salas de aula do professor:", error);
    }
  };

  useEffect(() => {
    Promise.all([getTeacherProfile()]);
  }, []);

  const editUser = async (user) => {
    let msgType = "success";
    let msgText = "Usuário editado com sucesso.";

    try {
      await api.patch(`/teacher/edit/${user.id}`, user).then((response) => {
        return response.data;
      });
      setFlashMessage(msgText, msgType);
    } catch (error) {
      msgType = "error";
      msgText = error.response.data.errors[0];

      setFlashMessage(msgText, msgType);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();

    editUser(user);
  };

  return (
    <section className={styles.profile_container}>
      <div className={styles.profile_header}>
        <h1>Meu perfil</h1>
      </div>

      <div className={styles.profile_info}>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
        <p>Atualmente registrado em: {turmas.length} turmas </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_field}>
          <label htmlFor='Nome'>Nome:</label>
          <input
            type='text'
            name='nome'
            placeholder='Digite seu nome'
            onChange={handleChange}
            value={user.nome || ""}
          />
        </div>

        <div className={styles.form_field}>
          <label htmlFor='disciplina'>Sua disciplina atual:</label>
          <select className='input' onChange={handleChange} name='disciplina'>
            <option disabled selected>
              {user.disciplina}
            </option>
            {disciplinas.map((disciplina) => (
              <option value={disciplina} key={disciplina}>
                {disciplina}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form_field}>
          <label htmlFor='password'>Senha:</label>
          <input
            type='password'
            name='password'
            placeholder='Digite sua senha'
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor='confirmPassword'>Confirme sua senha:</label>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirme sua senha'
            onChange={handleChange}
          />
        </div>

        <input type='submit' value='Editar' />
      </form>
    </section>
  );
};

export default Profile;
