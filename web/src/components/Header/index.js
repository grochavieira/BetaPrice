import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Header = ({
  isActiveHome,
  isActiveProducts,
  isActiveCategories,
  isActiveLogin,
  isActiveAbout,
}) => {
  return (
    <div className="header-container">
      <div className="logo">
        <p>DevNinjas</p>
      </div>
      <div>
        <ul>
          <li className={isActiveHome ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActiveProducts ? "active" : ""}>
            <Link to="/products">Produtos & Tarefas</Link>
          </li>
          <li className={isActiveCategories ? "active" : ""}>
            <Link to="/categories">Categorias</Link>
          </li>
          <li className={isActiveLogin ? "active" : ""}>
            <Link to="/login">Login</Link>
          </li>
          <li className={isActiveAbout ? "active" : ""}>
            <Link to="/about">Sobre</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
