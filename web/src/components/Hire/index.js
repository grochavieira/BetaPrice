import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import dev from "../../assets/dev.png";

import "./styles.css";

const Hire = () => {
  return (
    <section className="section-hire">
      <div className="section-hire__content">
        <h1 className="heading-primary">
          Venha se tornar um profissional no DevNinjas!
        </h1>
        <p className="paragraph">
          Aqui no DevNinjas estamos abertos para contratar profissionais e
          ajudar você, programador e programadora, a encontrarem clientes e
          iniciar seu próprio negócio!
        </p>
        <Link to="/register-dev">
          <Button name="Comece hoje!" classes="btn btn-3"/>
        </Link>
      </div>

      <div className="section-hire__image">
        <img src={dev} alt="dev" className="hire-image" />
      </div>
    </section>
  );
};

export default Hire;
