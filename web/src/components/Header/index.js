import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./styles.scss";

export const Header = ({
  isActiveRequests,
  isActiveCategories,
  isActiveLogin,
  isActiveAbout,
}) => {
  return (
    <div className="header">
      <div className="header__logo">
        <h1>DevNinjas</h1>
      </div>
      <nav>
        <ul>
          <li className={isActiveCategories ? "active" : ""}>
            <Link to="/categories">Categorias</Link>
          </li>
          <li className={isActiveRequests ? "active" : ""}>
            <Link to="/requests">Meus Pedidos</Link>
          </li>
          <li className={isActiveAbout ? "active" : ""}>
            <Link to="/about">Sobre</Link>
          </li>
          <li className={isActiveLogin ? "active" : ""}>
            <Link to="/">
              <FiLogOut />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
