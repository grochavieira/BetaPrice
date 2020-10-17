import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import robot from "../../assets/robot.png";

import "./styles.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__image">
        <img src={robot} alt="robot" />
      </div>
      <div className="hero__content">
        <h1>Aqui é o Lugar Certo para Expandir o seu negócio!</h1>
        <p>
          No DevNinjas, temos profissionais capacitados para desenvolver sites e
          aplicativos para desktop e mobile, consultores, data scientists, e
          muito mais!!! Tudo para que o seu negócio alcance o próximo nível!!!
        </p>
        <Link to="/register-client">
          <Button name="Se torne um Cliente!" classes="btn btn-2" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
