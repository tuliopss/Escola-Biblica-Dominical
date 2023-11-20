import { useEffect, useState } from "react";
import api from "../../utils/api";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./TurmaDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
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
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/student/${params.id}`)}>
                        Detalhes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate(`/student/update/${params.id}`)}>
                        Editar                                                              
                    </Button>
                </div>
            ),
        },
    ];

    return (

        <div>
            <div> 
                <Button  variant="contained" color="primary" onClick={() => navigate(`/student/create`)}>
                        Adicionar Aluno
                    </Button>
                    </div>
        <DataGrid
            rows={alunos}
            columns={columns}
        />
        </div>
    );
}

export default DashAlunos;
