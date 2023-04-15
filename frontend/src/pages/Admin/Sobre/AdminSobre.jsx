import React,{useState,useContext} from "react";
import {AuthContext} from "../../../contexts/auth"

const AdminSobre = () => {
    const {AdminSobrePost,sobre,AdminSobreDelete,AdminSobreUpdate} = useContext(AuthContext)
    const [id,setId] = useState('')
    const [titulo,setTitulo] = useState('')
    const [texto,setTexto] = useState('')
    const [btnPost,setBtnPost] = useState(true)

    const handleAdminSobre = ()=>{
        AdminSobrePost(titulo,texto)
        setTitulo('')
        setTexto('')
    }
    const handleAdminSobreUpdate = (a,b,c)=>{
      AdminSobreUpdate(a,b,c)
      setBtnPost(true)
      setTitulo('')
      setTexto('')
      
    }
  return (
    <div className="p-2" style={{minHeight:"800px",maxHeight:"100%",height:"100%",fontFamily:"Maven Pro"}}>
        <h1 className="text-center mt-2 mb-3">Admin Sobre</h1>
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título
        </label>
        <input
          type="email"
          className="form-control"
          id="titulo"
          placeholder="Um Título aqui..."
          value={titulo}
          onChange={(e)=>setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="texto" className="form-label">
          Texto
        </label>
        <textarea
        style={{minHeight:"5rem",maxHeight:"30rem",height:"8rem"}}
          className="form-control"
          id="texto"
          rows="3"
          value={texto}
          onChange={(e)=>setTexto(e.target.value)}
        ></textarea>
        {
          btnPost?
           <button className="btn btn-primary mt-1 ms-1"
        onClick={handleAdminSobre}>Enviar</button>
        :
        <div>
          <button className='btn btn-warning mt-1 ms-1'
        onClick={()=>{handleAdminSobreUpdate(id,titulo,texto)}} >Publicar modificação</button>
        <button className="btn btn-danger mt-1 ms-1"
        onClick={()=>{
          setBtnPost(true)
          setId('')
          setTitulo('')
          setTexto('')
          }}>Cancelar modificação</button>
        </div>
        }
        

      </div>
      <div className="getSobre container text-center">
        <div className="label row">
            <p className="col-1">ID:</p>
            <p className="col">Titulo</p>
            <p className="col">Texto</p>
            <p className="col-2">Ações</p>
        </div>
{     sobre.length?
    sobre.map((item)=>(
       <div className="item row border-top" key={item.id}>
        <p className="col-1">{item.id}</p>
        <p className="col">{item.titulo}</p>
        <p className="col">{item.texto}</p>
        <button className='col-1 btn btn-warning m-1'
        onClick={()=>{
          setId(item.id)
          setTitulo(item.titulo)
          setTexto(item.texto)
          setBtnPost(false)
        }}>Editar</button>
        <button className="col-1 btn btn-danger m-1"
        onClick={()=>{
            AdminSobreDelete(item.id)

        }}
        >Apagar</button>
       </div>
    ))
   :
    <p>Carregando dados...</p>
}

      </div>
    </div>
  );
};

export default AdminSobre;
