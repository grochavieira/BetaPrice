import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import robot from "../../assets/robot.png";

import "./styles.css";

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="section-hero__image">
        <img src={robot} alt="robot" className="hero-image" />
      </div>
      <div className="section-hero__content">
        <h1 className="heading-primary">
          Aqui é o Lugar Certo para Expandir o seu negócio!
        </h1>
        <p className="paragraph">
          No DevNinjas, temos profissionais capacitados para desenvolver sites e
          aplicativos para desktop e mobile, consultores, data scientists, e
          muito mais!!! Tudo para que o seu negócio alcance o próximo nível!!!
        </p>
        <Link to="/register-client">
          <Button name="Expanda seu negócio!" classes="btn btn-2"/>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
