import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ModalCadastro from "./components/ModalCadastro";
import ModalLogin from "./components/ModalLogin";
import Navbar from "./components/layouts/Navbar";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Context, UserProvider } from "./context/UserContext";
import Message from "./components/layouts/Message";
import Notas from "./components/Notas";
import Turmas from "./components/pages/Turmas";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Container from "./components/layouts/Container";
import TurmaDetails from "./components/pages/TurmaDetails";
import Overview from "./components/Overview";
import AddTurma from "./components/pages/AddTurma";
import Profile from "./components/pages/Profile";
import TeacherList from "./components/pages/TeacherList";
import DashAlunos from "./components/pages/DashAlunos";
import AlunoDestalhes from "./components/pages/AlunoDetalhes";
import AddAluno from "./components/pages/AddAluno";
import EditAluno from "./components/pages/EditAluno";
import useAuth from "./hooks/useAuth";
function App() {
  const { authenticated } = useAuth();

  return (
    <BrowserRouter>
      <UserProvider>
        <Container>
          <Message />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/turmas'
              // element={authenticated ? <Turmas /> : <Home />}
              element={authenticated ? <Turmas /> : <Navigate to='/' />}
            />
            <Route
              path='/turmas/:id'
              element={authenticated ? <TurmaDetails /> : <Navigate to='/' />}
            />
            <Route
              path='/professores'
              element={authenticated ? <TeacherList /> : <Navigate to='/' />}
            />
            <Route
              path='/addTurma'
              element={authenticated ? <AddTurma /> : <Navigate to='/' />}
            />
            <Route
              path='/profile'
              element={authenticated ? <Profile /> : <Navigate to='/' />}
            />
            <Route
              path='/alunos/dashboard'
              element={authenticated ? <DashAlunos /> : <Navigate to='/' />}
            />
            <Route
              path='/alunos/create'
              element={authenticated ? <AddAluno /> : <Navigate to='/' />}
            />
            <Route
              path='/alunos/update/:id'
              element={authenticated ? <EditAluno /> : <Navigate to='/' />}
            />
            <Route
              path='/aluno/:id'
              element={authenticated ? <AlunoDestalhes /> : <Navigate to='/' />}
            />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
