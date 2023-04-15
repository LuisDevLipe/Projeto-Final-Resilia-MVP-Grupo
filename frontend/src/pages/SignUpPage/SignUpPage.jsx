import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

//Import SVG
import Cadastro from "../../../public/assets/undraw_security.svg";

//Imports Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Input from "react-bootstrap/InputGroup";

const SignUpPage = () => {
  const { cadastro, signUpError } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    cadastro(nome, cpf, email, password);
  };
  return (
    <Container className="d-grid h-100 mb-4">
      <div className="d-flex  flex-column  align-items-center mt-5 ">
        <img
          src={Cadastro}
          alt="Imagem perfil"
          className="d-flex align-items-center h-25 w-25"
        />
        <h1>Cadastro</h1>
        <form
          className=" border border-primary rounded text-center p-3 h-90 w-90 col-md-5 col-sm-8 col-xs-6"
          onSubmit={handleCadastro}
        >
          <div className="mt-3 mb-3">
            <label className="form-label h4">Nome</label>
            <input
              className="form-control border border-primary"
              placeholder="Digite seu nome."
              type="text"
              name="nome"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mt-3 mb-3">
            <label className="form-label h4">CPF</label>
            <input
              className="form-control border border-primary text-none"
              placeholder="Digite seu CPF."
              type="number"
              name="cpf"
              id="cpf"
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="mt-3 mb-3">
            <label className="form-label h4">idade</label>
            <input
              className="form-control border border-primary text-none"
              placeholder="Sua Idade."
              type="number"
              name="idade"
              id="idade"
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>

          <div className="mt-3 mb-3">
            <label className="form-label h4">Email</label>
            <input
              className="form-control border border-primary"
              placeholder="Digite seu email."
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-3 mb-3">
            <label className="form-label h4">Senha</label>
            <input
              className="form-control border border-primary"
              placeholder="Digite sua senha."
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <small className="signUpError d-block text-danger mb-2">{signUpError}</small>
          <div className=" text-center">
            <Button type="submit" className="btn btn-lg btn-primary ">
              Sign up
            </Button>
          </div>

          <div className="text-start align-self-end mt-4">
            <p>
              Já possui uma conta?
              <Link className="signUp" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignUpPage;
