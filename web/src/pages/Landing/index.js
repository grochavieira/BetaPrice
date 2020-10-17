import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import loginImg from "../../assets/login_background.svg";
import "./styles.scss";

const Landing = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    history.push("/products");
  }

  return (
    <div className="landing">
      <div className="landing__aside">
        <div className="landing__aside__logo">
          <h1>DevNinjas</h1>
        </div>

        <form onSubmit={handleLogin} className="landing__aside__login">
          <h2>Realize seu login</h2>
          <Input
            value={email}
            setValue={setEmail}
            name="email"
            label="email"
            placeholder="Seu email"
          />
          <Input
            value={password}
            setValue={setPassword}
            name="password"
            type="password"
            label="senha"
            placeholder="Sua senha"
          />
          <Button name="Entrar" classes="btn btn-2 btn-square" />
        </form>

        <div className="landing__aside__register">
          <Link to="/home">
            <FiLogIn /> Não tenho cadastro
          </Link>
        </div>
      </div>
      <div className="landing__image-block">
        <img src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Landing;
