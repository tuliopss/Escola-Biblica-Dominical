import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { DataGrid } from '@mui/x-data-grid';

const DetalhesAluno = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState({});

  useEffect(() => {
    api.get(`/student/${id}`)
      .then(response => {
        setAluno(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do aluno:', error);
      });
  }, [id]);

  if (!aluno || Object.keys(aluno).length === 0) {
    return <div>Carregando detalhes do aluno...</div>;
  }

  const detalhesAluno = {
    id: aluno.id,
    nome: aluno.nome,
    email: aluno.email,
    idade: aluno.idade,
    categoria: aluno.categoria,
    // Adicione outras informações do aluno conforme necessário
  };

  const columns = [
    { field: 'campo', headerName: 'Campo', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 250 },
  ];

  const rows = Object.keys(detalhesAluno).map(campo => ({
    id: campo,
    campo,
    valor: detalhesAluno[campo],
  }));

  return (
    <div style={{ height: 300, width: '100%' }}>
      <h2>Detalhes do Aluno</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick 
      />
    </div>
  );
};

export default DetalhesAluno;
