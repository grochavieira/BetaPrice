import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import devBackground from "../../assets/form-dev-background.svg";
import "./styles.css";

const RegisterDev = () => {
  return (
    <div className="register-dev-container">
      <div className="form-container">
        <div className="form-dev-background">
            <h2> <Link to="/"><FiArrowLeft /></Link> DevNinjas</h2>
            <img src={devBackground} alt=""/>
            <h3>Expandindo seus horizontes!</h3>
        </div>
      <form action="#" className="form">
        <h2 className="heading-secondary">Cadastro de Desenvolvedor</h2>
        <div className="data-block">
          <p className="block-title">
            Dados pessoais
          </p>
        <Input name="name" label="Nome Completo" placeholder="Nome Completo" />
        <Input
          name="telephone"
          label="Telefone ou Celular"
          placeholder="Telefone ou Celular"
        />
        <Input
          name="email"
          label="Endereço de E-mail"
          placeholder="Endereço de E-mail"
          type="email"
        />
        </div>
        <div className="data-block">
          <p className="block-title">
            Dados profissionais
          </p>
        <Input
          name="portfolioUrl"
          label="URL do portfólio"
          placeholder="URL do portfólio"
        />
        <Input name="bio" label="Bio" placeholder="Bio" />
        <Input
          name="technologies"
          label="Tecnologias"
          placeholder="Tecnologias"
        />
        </div>
        <div className="data-block">
          <p className="block-title">
            Dados de usuário
          </p>
        <Input
          name="username"
          label="Nome de Usuário"
          placeholder="Nome de Usuário"
        />
        <Input
          name="password"
          label="Senha"
          placeholder="Senha"
          type="password"
        />
        <Input
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

export default RegisterDev;
