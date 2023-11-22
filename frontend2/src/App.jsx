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
import NoAuth from "./components/layouts/NoAuth";
function App() {
  const { authenticated } = useContext(Context);

  return (
    <UserProvider>
      {console.log("Authent", authenticated)}

      <BrowserRouter>
        <Container>
          <Message />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            {authenticated ? (
              <>
                <Route path='/turmas' element={<Turmas />} />
                <Route path='/turmas/:id' element={<TurmaDetails />} />
                <Route path='/professores' element={<TeacherList />} />
                <Route path='/addTurma' element={<AddTurma />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/alunos/dashboard' element={<DashAlunos />} />
                <Route path='/alunos/create' element={<AddAluno />} />
                <Route path='/alunos/update/:id' element={<EditAluno />} />
                <Route path='/aluno/:id' element={<AlunoDestalhes />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
