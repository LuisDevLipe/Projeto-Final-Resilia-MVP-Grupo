import React, { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { Link } from "react-router-dom"
import "./LoginPageStyle.css"

// Import SVG
import Profile from '../../../public/assets/undraw_profile.svg'

//Imports Bootstrap
import Container from 'react-bootstrap/Container';
import  Button  from "react-bootstrap/Button";
import Input from 'react-bootstrap/InputGroup';

const LoginPage = () => {
  const {login,loginError} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    login(email,password)

  };

  return (
    <Container className="d-grid h-100 mb-4">
    <div className="d-flex  flex-column  align-items-center mt-5 ">
        
        <img src={Profile} alt="Imagem perfil"  className="d-flex align-items-center h-25 w-25"/>
        <h1>Login</h1>
      <form className=" border border-primary rounded text-center p-3 w-90 col-md-4 col-sm-8" onSubmit={handleLogin}>
              <div className="mt-3 mb-3">
                
                  <label className="form-label h4">Email</label>

                  <input  className="form-control border border-primary" placeholder="Digite seu email." 
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="mt-3 mb-3">
                  <label className="form-label h4">Senha</label>
                  <input  className="form-control border border-primary"  placeholder="Digite sua senha."
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              
              <p className="loginError">{loginError}</p>
              <div className=" text-center">
                  <Button type="submit" className="btn btn-lg btn-primary ">Sign in</Button>
          </div>

      <div className="text-start align-self-end mt-4">
    <p >Não possui uma conta?<Link className='signIn' to='/cadastro'>Sign Up</Link></p>
    </div>
      </form>
      </div>
      </Container>
  );
};

export default LoginPage;
