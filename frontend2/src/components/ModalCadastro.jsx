import { useState, useContext } from "react";
import "./Modal.css";
import { Context } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function ModalCadastro() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [nome, setNome] = useState("");
  const { register } = useContext(Context);
  const disciplinas = ["Etica", "Teologia", "Evangelho", "Criacao", "Historia"];

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  //   // console.log(nome);
  // };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubject = (e) => {
    setUser({
      ...user,
      disciplina: e.target.value,
    });
    console.log(user.disciplina);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await register(user)) {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <Link onClick={toggleModal} className='btn-modal'>
        Cadastro
      </Link>

      {modal && (
        <div id='wrapper'>
          <div className='modal'>
            <div onClick={toggleModal} className='overlay'></div>

            <div className='modal-content'>
              <form onSubmit={handleSubmit} id='form' method='post'>
                <div className='box' id='divForm'>
                  <h3 className='text-login'>Cadastrar</h3>

                  <input
                    className='input'
                    type='text'
                    name='nome'
                    placeholder='Nome'
                    // value={nome}
                    onChange={handleChange}
                  />

                  <input
                    className='input'
                    name='email'
                    type='email'
                    placeholder='Email'
                    id='email'
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    className='input'
                    name='password'
                    type='password'
                    placeholder='Senha'
                    id='pw'
                    onChange={handleChange}
                  />
                  <input
                    className='input'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirme sua senha'
                    onChange={handleChange}
                  />
                  {/* <label>Selecione uma disciplina:</label> */}
                  <select
                    className='input'
                    onChange={handleSubject}
                    name='disciplina'>
                    <option disabled selected>
                      Selecione
                    </option>
                    {disciplinas.map((disciplina) => (
                      <option value={disciplina} key={disciplina}>
                        {disciplina}
                      </option>
                    ))}
                  </select>
                  <br />
                  <button className='btn-send'>Cadastrar</button>
                </div>
              </form>

              <button className='close-modal' onClick={toggleModal}>
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
