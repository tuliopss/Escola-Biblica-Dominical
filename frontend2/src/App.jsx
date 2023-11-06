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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <!--NAVIGATION BLOG START--> */}

      <BrowserRouter>
        <UserProvider>
          <Message />
          <Navbar />
          <Routes>
            <Route path='/notas' />
            <Route path='/d' />
            <Route path='/a' />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      {/* </UserProvider> */}
      {/* <!--NAVIGATION BLOG END--> */}
      <section className='hero'>
        <div className='container'>
          <div className='left-col'>
            <p className='sub-head'>Olá tudo bem?</p>
            <h1>Faça seu cadastro e aproveite !</h1>

            <div className='hero-cta'>
              <button href='#' className='primery-cta'>
                Comece já
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!--SECTION FEATURES BLOG START--> */}
      <section className='features-section'>
        <div className='container'>
          <ul>
            <li>Organize seus deveres a qualquer hora e lugar</li>
            <li>Veja suas disciplinas e atividades</li>
            <li>Faça seu cadastro e aproveite nosso app</li>
            <li>Siga as orientações do seu professor</li>
            <li>Qualquer dúvida, nos mande um recado</li>
          </ul>
        </div>
      </section>
      {/* <!--SECTION FEATURES BLOG END--> */}

      {/* <!--SECTION TEST  BLOG START--> */}

      {/* <!--SECTION TEST  BLOG END--> */}

      {/* <!--SECTION CONTACT  BLOG START--> */}
      <section className='contact-section'>
        <div className='container'>
          <div className='contact-left'>
            <h2>Recado</h2>
            <h3>
              Dentro de 72 horas vamos mandar um email de retorno para você. Até
              logo!
            </h3>
            <form action='#' method='post'>
              <label htmlFor='name'>Seu Email, por favor</label>
              <input type='email' id='name' name='name' />
              <label htmlFor='message'>Sua dúvida</label>
              <textarea
                name='message'
                id='message'
                cols='30'
                rows='10'></textarea>

              <input
                type='submit'
                value='Enviar recado'
                className='send-message'
              />
            </form>
          </div>
        </div>
      </section>

      <footer className='footer'>
        Church Coding © 2023 All Rights Reserved
      </footer>

      {/* <!--JAVASCRIPT START-->
     <script>
            
     </script> */}

      {/* <!--SECTION HERO BLOG START--> */}
    </>
  );
}

export default App;
