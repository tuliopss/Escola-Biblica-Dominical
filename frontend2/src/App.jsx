import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ModalCadastro from "./components/ModalCadastro";
import ModalLogin from "./components/ModalLogin";
import Navbar from "./components/layouts/Navbar";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Message from "./components/layouts/Message";
import Notas from "./components/Notas";
import Turmas from "./components/pages/Turmas";
import Atividades from "./components/Atividades";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Container from "./components/layouts/Container";
import TurmaDetails from "./components/pages/TurmaDetails";
import Overview from "./components/Overview";
import AddTurma from "./components/pages/AddTurma";
import Profile from "./components/pages/Profile";
import TeacherList from "./components/pages/TeacherList";
function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Container>
            <Message />
            <Navbar />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/notas' element={<Notas />} />
              <Route path='/turmas' element={<Turmas />} />
              <Route path='/turmas/:id' element={<TurmaDetails />} />
              <Route path='/professores' element={<TeacherList />} />
              <Route path='/addTurma' element={<AddTurma />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
