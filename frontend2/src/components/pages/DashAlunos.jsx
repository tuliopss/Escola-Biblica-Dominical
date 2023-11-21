import { useEffect, useState } from "react";
import api from "../../utils/api";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./DashAlunos.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const DashAlunos = () => {
  const [alunos, setTurmas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/student").then((response) => {
      setTurmas(response.data);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nome", headerName: "Nome", flex: 1, width: 200 },
    { field: "email", headerName: "Email", flex: 1, width: 200 },
    { field: "idade", headerName: "Idade", width: 100 },
    { field: "categoria", headerName: "Categoria", width: 100 },
    {
      field: "actions",
      headerName: "Ações",
      width: 300,
      renderCell: (params) => (
        <div className={styles.actions}>
          <Link to={`/alunos/update/${params.id}`}>
            <button className={styles.btn_edit}>Editar</button>
          </Link>
          <Link to={`/aluno/${params.id}`}>
            <button className={styles.details}>Detalhes</button>
          </Link>
          <button className={styles.btn_delete}>Excluir</button>
          {/* <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(`/alunos/${params.id}`)}>
            Detalhes
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => navigate(`/alunos/update/${params.id}`)}>
            Editar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => navigate(`/alunos/update/${params.id}`)}>
            Editar
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(`/alunos/create`)}>
          Adicionar Aluno
        </Button>
      </div>
      <DataGrid rows={alunos} columns={columns} />
    </div>
  );
};

export default DashAlunos;
