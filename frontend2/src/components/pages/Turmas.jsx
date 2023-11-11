import { useEffect, useState } from "react";
import styles from "./Turmas.module.css";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const Turmas = () => {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    api.get("/classroom").then((response) => {
      setTurmas(response.data);
    });
  }, []);

  return (
    <section>
      <div className={styles.turmas_header}>
        <h1>Veja as turmas cadastradas:</h1>
        <Link to='/addTurma'>
          <button className={styles.btn_add_turma}>Criar nova turma</button>
        </Link>
      </div>

      <div className={styles.turma_container}>
        {turmas.length > 0 &&
          turmas.map((turma) => (
            <div key={turma.id} className={styles.turma_card}>
              <h3>Turma {turma.id}</h3>
              <p>Disciplina: {turma.disciplina}</p>
              <p>Categoria: {turma.categoria}</p>
              <p>
                Professor:{" "}
                {turma.professor ? turma.professor.nome : "Não atribuído"}
              </p>
              <Link to={`/turmas/${turma.id}`}>Ver mais</Link>
            </div>
          ))}
      </div>
    </section>
  );
};
export default Turmas;
