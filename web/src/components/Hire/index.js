import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import dev from "../../assets/dev.png";

import "./styles.scss";

const Hire = () => {
  return (
    <section className="hire">
      <div className="hire__content">
        <h1>Venha se tornar um profissional no DevNinjas!</h1>
        <p>
          Aqui no DevNinjas estamos abertos para contratar profissionais e
          ajudar você, programador e programadora, a encontrarem clientes e
          iniciar seu próprio negócio!
        </p>
        <Link to="/register-dev">
          <Button name="Se Torne um Profissional!" classes="btn btn-3" />
        </Link>
      </div>

      <div className="hire__image">
        <img src={dev} alt="dev" />
      </div>
    </section>
  );
};

export default Hire;
