import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import clientBackground from "../../assets/form-client-background.svg";
import api from "../../services/api";

import "./styles.css";

const RegisterClient = () => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      const clientData = {
        name,
        telephone,
        email,
        username,
        password,
      };

      const { data } = await api.post("/clients", clientData);

      if (data.errors) {
        const errors = data.errors.join(". ");
        alert(errors);
      } else {
        alert("Cadastro realizado com sucesso!");
        history.goBack();
      }
    } catch (e) {
      alert("Não foi possível realizar o cadastro!");
    }
  }

  return (
    <div className="register-client-container">
      <div className="form-container">
        <div className="form-client-background">
          <h2>
            {" "}
            <Link to="/">
              <FiArrowLeft />
            </Link>{" "}
            DevNinjas
          </h2>
          <img src={clientBackground} alt="" />
          <h3>Dando forma as suas ideias!</h3>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <h2 className="heading-secondary">Cadastro</h2>
          <div className="data-block">
            <p className="block-title">Dados pessoais</p>
            <Input
              value={name}
              setValue={setName}
              name="name"
              label="Nome Completo"
              placeholder="Nome Completo"
            />
            <Input
              value={telephone}
              setValue={setTelephone}
              name="telephone"
              label="Telefone ou Celular"
              placeholder="Telefone ou Celular"
            />
            <Input
              value={email}
              setValue={setEmail}
              name="email"
              label="Endereço de E-mail"
              placeholder="Endereço de E-mail"
              type="email"
            />
          </div>
          <div className="data-block">
            <p className="block-title">Dados de usuário</p>
            <Input
              value={username}
              setValue={setUsername}
              name="username"
              label="Nome de Usuário"
              placeholder="Nome de Usuário"
            />
            <Input
              value={password}
              setValue={setPassword}
              name="password"
              label="Senha"
              placeholder="Senha"
              type="password"
            />
            <Input
              value={confirmPassword}
              setValue={setConfirmPassword}
              name="passwordConfirm"
              label="Confirmar Senha"
              placeholder="Confirmar Senha"
              type="password"
            />
          </div>
          <Button name="Enviar" classes="btn btn-2 btn-square" />
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
