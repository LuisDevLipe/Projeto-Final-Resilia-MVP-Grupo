import React,{useState,useContext} from "react";
import {AuthContext} from "../../../contexts/auth"

const AdminSobre = () => {
    const {AdminSobrePost,sobre,AdminSobreDelete,AdminSobreUpdate} = useContext(AuthContext)
    const [id,setId] = useState('')
    const [titulo,setTitulo] = useState('')
    const [texto,setTexto] = useState('')
    const [btnPost,setBtnPost] = useState(true)
    const [responseStatus,setResponseStatus] = useState({
      createSuccess:"POST criado com sucesso",
      updateSuccess:"POST atualizado com sucesso",
      createError:"Houve um Problema ao tentar Criar este POST. Por favor tente novamente mais tarde.",
      updateError:"Não foi possivel atualizar este POST. Por favor tente novamente mais tarde.",
      createErrorExists:false,
      updateErrorExists:false,
      createWasSuccessful:false,
      updateWasSuccessful:false
    })
    
    const resetErrorHandlerTrigger = ()=>setResponseStatus({...responseStatus,createErrorExists:false,updateErrorExists:false,createWasSuccessful:false,updateWasSuccessful:false})
    const handleAdminSobre = async ()=>{
      if( texto === "" || titulo === "" ) 
        return alert("Não nos envie uma mensagem vazia por favor... :(")
      const response = await AdminSobrePost(titulo,texto)
      if (response.status != 201)setResponseStatus({...responseStatus,updateErrorExists:false,createErrorExists:true})
      if (response.status === 201)setResponseStatus({...responseStatus,updateWasSuccessful:false,createWasSuccessful:true})
      setTitulo('')
      setTexto('')
    }
    const handleAdminSobreUpdate = async (a,b,c)=>{
      console.log(responseStatus.createWasSuccessful,responseStatus.updateWasSuccessful)
      if(( titulo || texto ) === "" ) 
        return alert("Não nos envie uma mensagem vazia por favor... :(")
      const response = await AdminSobreUpdate(a,b,c)
      if (response.status != 200)setResponseStatus({...responseStatus,createErrorExists:false,updateErrorExists:true})
      if (response.status === 200)setResponseStatus({...responseStatus,createWasSuccessful:false,updateWasSuccessful:true})
      console.log(responseStatus.createWasSuccessful,responseStatus.updateWasSuccessful)
      setBtnPost(true)
      setTitulo('')
      setTexto('')
      console.log(response)
    }
    console.log(responseStatus.createWasSuccessful,responseStatus.updateWasSuccessful)
  return (
    <div className="p-2" style={{minHeight:"800px",maxHeight:"100%",height:"100%",fontFamily:"Maven Pro"}}>
        <h1 className="text-center mt-2 mb-3">Admin Sobre:</h1>
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
          resetErrorHandlerTrigger()
          setBtnPost(true)
          setId('')
          setTitulo('')
          setTexto('')
          }}>Cancelar modificação</button>
        </div>
        }
        
        {(responseStatus.createErrorExists && <p className="genericError">{responseStatus.createError}</p>)}
        {(responseStatus.updateErrorExists && <p className="genericError">{responseStatus.updateError}</p>)}
        {(responseStatus.createWasSuccessful && <p className="genericSuccess">{responseStatus.createSuccess}</p>)}
        {(responseStatus.updateWasSuccessful && <p className="genericSuccess">{responseStatus.updateSuccess}</p>)}
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
