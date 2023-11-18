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
            {authenticated ? (
              <>
                {" "}
                <li
                  className={
                    location.pathname === "/professores" ? "current" : ""
                  }>
                  <Link to='/professores'>Professores</Link>
                </li>
                <li
                  className={location.pathname === "/turmas" ? "current" : ""}>
                  <Link to='/turmas'>Turmas</Link>
                </li>
                <li
                  className={location.pathname === "/alunos" ? "current" : ""}>
                  <Link to='/alunos/dashborad'>Alunos</Link>
                </li>
                <li
                  className={location.pathname === "/profile" ? "current" : ""}>
                  <Link to='/profile'>Meu perfil</Link>
                </li>
                <li className='sairnav' onClick={logout}>
                  Sair
                </li>
              </>
            ) : (
              <>
                <li>
                  <ModalCadastro />
                </li>
                <li>
                  <ModalLogin />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
