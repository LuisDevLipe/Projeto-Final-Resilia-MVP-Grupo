import React, { useContext,useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Form,Button,Container } from "react-bootstrap";
import "./MinhaConta.css"
const MinhaConta = () => {
  const { user,update,logout } = useContext(AuthContext);
  const { id,nome, email, cpf, idade = 0 } = user;

    const [newNome,setNewNome] = useState(nome)
    const [newEmail,setNewEmail] = useState(email)
    const [newIdade,setNewIdade] = useState(idade)
    const [newCpf,setNewCpf] = useState(cpf)
    const [password,setPassword] = useState('')

    const [botao ,setBotao] = useState(false)
    const [senhaError,setSenhaError] = useState('')

    const handleUpdate = (e) => {
      e.preventDefault()
      if (password.length >= 4) {
        update(id, newNome, newEmail, newIdade, newCpf, password),
        setBotao(false);
        setSenhaError('')
        logout()

      }else if (password.length <4)
      setSenhaError("Senha precisa ter no mínimo 4 caracteres");
    };
    const style = {
        flex:{
            display:"flex",
            gap:"4px",
            flexDirection:"column",
            padding:"1rem",
            margin:"1rem 3rem",
            width:"100%"

        },
        db:{
            display:"block"
        },
        cont:{
            display:"flex",
            margin:"0 auto",
            borderRadius:"24px",
            boxShadow:"4px 4px 5px lightgrey",
            width:"95%",
            height:"650px"
        },
        cont2:{
          margin:"0 auto",
          borderRadius:"24px",
          boxShadow:"4px 4px 5px lightgrey",
          width:"95%",
          height:"650px"
        }
    }
  return (
    <>
    {
        botao ? (
          <>
 <Container className='mt-5 mb-5' style={style.cont2}>

<div className=' text-center mb-2'>
<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
</svg>
</div>

<Form>
<div className="d-flex flex-row flex-wrap justify-content-around">


<div className="">
<label htmlFor="validationServer01">Nome</label>
<input type="text" className="form-control is-valid" required placeholder={nome}
    value={newNome}
    onChange={(e)=> setNewNome(e.target.value)}/>
</div>

<div className="">
<label htmlFor="validationServer02">CPF</label>
<input type="text" className="form-control is-valid" required placeholder={cpf}
    value={newCpf} 
    onChange={(e)=> setNewCpf(e.target.value)}/>
</div>

<div className="">
<label htmlFor="validationServer03">Idade</label>
<input type="number" className="form-control is-valid" required placeholder={idade}
    value={newIdade}
    onChange={(e)=> setNewIdade(e.target.value)}/>
</div>

<div className="">
<label htmlFor="validationServer04">Email</label>
<input type="email" className="form-control is-valid" required placeholder={email}
    value={newEmail} 
    onChange={(e)=> setNewEmail(e.target.value)}/>
</div>

<div className="">
<label htmlFor="validationServer05">Senha: <span style={{color:"red",fontSize:"0.8rem"}} >Atenção! Digite sua senha atual ou digite uma nova senha.</span></label>
<input type="password" className="form-control is-valid" placeholder="Atualize sua senha" required 
    value={password}
    onChange={(e)=> setPassword(e.target.value)} />
    <small>{senhaError}</small>
</div>
</div>

<div className='text-center mt-2'>
<Button onClick={handleUpdate} className="btn btn-primary" type="submit">Atualizar informações</Button>
<Button onClick={()=>setBotao(false)} className="btn btn-danger" type="button">Cancelar</Button>
</div>
</Form>
</Container>
      </>

      ) : (

      <div className="conta border mt-5 mb-5" style={style.cont}>
        <div className="profile">
          <div className="img">
            
          </div>
        </div>
        <div style={style.flex}>
            <h1>Informações da Conta:</h1>
        <p className='text-muted'>Nome:</p>
        <h3 className='border-bottom w-50'>{nome}</h3>
        <p className='text-muted'>Email:</p>
        <p className='border-bottom w-50'>{email}</p>
        <p className='text-muted'>Idade:</p>
        <p className='border-bottom w-50'>{idade}</p>
        <p className='text-muted'>CPF:</p>
        <p className='border-bottom w-50'>{cpf}</p>
        <div className="text-center mt-2">
        <Button className='mt-2 mb-2 btn btn-warning' onClick={()=>setBotao(true)}>Alterar dados</Button>
        </div>
        </div>
      </div>
      )
    }
    </>
  );
};

export default MinhaConta;
