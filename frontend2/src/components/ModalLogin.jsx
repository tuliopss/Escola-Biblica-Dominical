import React, { useContext, useState } from "react";
import "./Modal.css";
import { Link } from "react-router-dom";
import { Context } from "../context/UserContext";

export default function ModalLogin() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await login(user)) {
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
        Login
      </Link>

      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
              <div className='box'>
                <h3 className='text-login'>Login</h3>
                <input
                  className='input'
                  name='email'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange}
                />
                <br />
                <input
                  className='input'
                  name='password'
                  type='password'
                  placeholder='Senha'
                  onChange={handleChange}
                />
                <br />
                <button className='btn-send'>Entrar</button>
              </div>
            </form>

            <button className='close-modal' onClick={toggleModal}>
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}
