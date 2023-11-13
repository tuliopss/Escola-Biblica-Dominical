import React, { useContext } from "react";
import ModalCadastro from "../ModalCadastro";
import ModalLogin from "../ModalLogin";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/UserContext";
// import { Link } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const { authenticated, logout } = useContext(Context);
  return (
    <div className='nav-bar'>
      <div className='container'>
        <Link className='logo-nav' to='/'>
          <img
            src='../../../public/EBDlogo.jpg'
            className='img_logo'
            alt=''
            srcset=''
          />
          Escola Bíblica Dominical
        </Link>
        <nav>
          <ul className='primary-nav'>
            <li className={location.pathname === "/notas" ? "current" : ""}>
              <Link to='/notas'>Notas</Link>
            </li>
            <li className={location.pathname === "/turmas" ? "current" : ""}>
              <Link to='/turmas'>Turmas</Link>
            </li>
            <li
              className={location.pathname === "/atividades" ? "current" : ""}>
              <Link to='/atividades'>Atividades</Link>
            </li>
            <li className={location.pathname === "/profile" ? "current" : ""}>
              <Link to='/profile'>Meu perfil</Link>
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
