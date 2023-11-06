import React from "react";
import ModalCadastro from "../ModalCadastro";
import ModalLogin from "../ModalLogin";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='nav-bar'>
      <div className='container'>
        <a className='logo-nav' to=''>
          Escola Bíblica Dominical
        </a>
        <nav>
          <ul className='primary-nav'>
            <li className='current'>
              <Link to='/notas'>Notas</Link>
            </li>
            <li>
              <Link to='/d'>Disciplinas</Link>
            </li>
            <li>
              <Link to='/a'>Atividades</Link>
            </li>
            <li>
              <ModalCadastro />
            </li>
            <li>
              <ModalLogin />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
