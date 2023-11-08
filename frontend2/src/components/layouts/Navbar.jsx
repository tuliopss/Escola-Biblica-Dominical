import React, { useContext } from "react";
import ModalCadastro from "../ModalCadastro";
import ModalLogin from "../ModalLogin";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";
// import { Link } from "react-router-dom";
const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  return (
    <div className='nav-bar'>
      <div className='container'>
        <Link className='logo-nav' to='/'>
          Escola Bíblica Dominical
        </Link>
        <nav>
          <ul className='primary-nav'>
            <li className='current'>
              <Link to='/notas'>Notas</Link>
            </li>
            <li>
              <Link to='/turmas'>Disciplinas</Link>
            </li>
            <li>
              <Link to='/'>Atividades</Link>
            </li>
            <li>
              <ModalCadastro />
            </li>
            <li>
              <ModalLogin />
            </li>
            <li onClick={logout}>Sair</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
