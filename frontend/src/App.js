
import './App.css';

import ModalCadastro from "./ModalCadastro";
import ModalLogin from "./ModalLogin";

function App() {
  return (
    <div className="App">
      {/* <!--NAVIGATION BLOG START--> */}
      <div className="nav-bar">
        <div className ="container">
          <a className="logo-nav" href="">
            Escola Bíblica Dominical
          </a>
	  
	      
          
          <nav>
             
            	             
            <ul className ="primary-nav">
              <li className ="current">
                <a href="#">Notas</a>
              </li>
              <li>
                <a href="#">Disciplinas</a>
              </li>
              <li>
                <a href="#">Atividades</a>
              </li>
              <li>
                <ModalCadastro/>
              </li>
	      <li>
                <ModalLogin/>
              </li>
	      
	     
	      
            </ul>
	    
                
	    
          </nav>
        </div>
      </div>
      {/* <!--NAVIGATION BLOG END--> */}

      {/* <!--SECTION HERO BLOG START--> */}
      <section className="hero">
        <div className ="container">
          <div className ="left-col">
            <p className ="sub-head">Olá tudo bem?</p>
            <h1>Faça seu cadastro e aproveite !</h1>

            <div className="hero-cta">
              <button href="#" className="primery-cta">
                Comece já
              </button>
              
            </div>
          </div>

         
        </div>
      </section>
      

      {/* <!--SECTION FEATURES BLOG START--> */}
      <section className ="features-section">
        <div className ="container">
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
      <section className="contact-section">
        <div className="container">
          <div class="contact-left">
            <h2>Recado</h2>
	    <h3>Dentro de 72 horas vamos mandar um email de retorno para você. Até logo!</h3>
            <form action="#" method="post">
              <label for="name">Seu Email, por favor</label>
              <input type="email" id="name" name="name" />
              <label for="message">Sua dúvida</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>


              <input type="submit" value="Enviar recado" class="send-message" />
            </form>
          </div>

          
        </div>
      </section>

      <footer className="footer">Church Coding © 2023 All Rights Reserved</footer>

      {/* <!--JAVASCRIPT START-->
     <script>
            
     </script> */}
    </div>
  );
}

export default App;
