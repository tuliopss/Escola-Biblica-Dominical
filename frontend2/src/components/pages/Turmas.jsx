import { useEffect, useState } from "react";
import styles from "./Turmas.module.css";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const Turmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/classroom", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTurmas(response.data);
      });
  }, []);

  function getBackgroundImageURL(index) {
    const images = [
      "https://media.istockphoto.com/id/1307457391/photo/happy-black-student-raising-arm-to-answer-question-while-attending-class-with-her-university.jpg?s=612x612&w=0&k=20&c=iZaZFyC-WqlqSQc4elqUNPTxLvWPe8P5Tb_YdZnrI9Q=",
      "https://media.istockphoto.com/id/1410336912/photo/happy-teacher-and-schoolgirl-giving-high-five-during-class-at-school.jpg?b=1&s=612x612&w=0&k=20&c=xsNB6m68_aVmyTPeYgFRcxXykHPXsZaNJHMDOK3ybGQ=",
      "https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=3xsykmHXFa9ejL_sP2Xxiow7zdtmKvg15UxXFfgR98Q=",
      "https://media.istockphoto.com/id/1414996628/photo/curly-haired-professor-teaching-class.jpg?s=612x612&w=0&k=20&c=U9t_Dfb8mqtcTVJFj8oVF6-hlGDuNNW09qYOSrRepN8=",
    ];

    return images[index % images.length];
  }

  return (
    <section>
      <div className='turmas-wrapper'>
        <div className={styles.turmas_header}>
          <h1>Veja as turmas cadastradas:</h1>
          <Link to='/addTurma'>
            <button className={styles.btn_add_turma}>Criar nova turma</button>
          </Link>
        </div>

        <div className={styles.turma_container}>
          {turmas.length > 0 &&
            turmas.map((turma, index) => (
              <div
                key={turma.id}
                className={styles.turma_card}
                style={{
                  backgroundImage: `url('${getBackgroundImageURL(index)}')`,
                }}>
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
      </div>
    </section>
  );
};
export default Turmas;
