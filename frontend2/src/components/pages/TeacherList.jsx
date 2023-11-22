import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../utils/api";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  const getTeachers = async () => {
    await api
      .get("/teacher/", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setTeachers(response.data);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <section>
      <h1>Professores cadastrados:</h1>
      <DataGrid
        disableRowSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 1,
          borderColor: "primary.main",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={teachers}
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "nome", headerName: "Nome", flex: 0.5, width: 100 },
          { field: "email", headerName: "Email", flex: 1, width: 100 },
          {
            field: "disciplina",
            headerName: "Disciplina",
            flex: 0.5,
            width: 200,
          },
        ]}
      />
    </section>
  );
};

export default TeacherList;
