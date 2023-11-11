import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

// import FormStyles from "./Form.module.css";

const AddTurma = () => {
  const [turma, setTurma] = useState({});
  const [disciplina, setDisciplina] = useState();
  const [professores, setProfessores] = useState([]);
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

  const handleChange = (e) => {
    setTurma({ ...turma, [e.target.name]: e.target.value });
    console.log(turma);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/classroom/createClassroom", turma);
    navigate("/turmas");
  };

  //className={FormStyles.form_container}
  return (
    <form onSubmit={handleSubmit}>
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

      {/* <select
        name='color'
        text='Selecione a cor'
        options={disciplinas}
        // onChange={handleSubject}
        // value={pet.color || ""}
      /> */}
      <input type='submit' />
    </form>
  );
};

export default AddTurma;
