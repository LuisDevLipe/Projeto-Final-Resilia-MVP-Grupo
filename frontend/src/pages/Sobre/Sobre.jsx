import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
const Sobre = () => {
  const { sobre } = useContext(AuthContext);
  const teste = [
    { id: 2, titulo: "teste1", texto: "texto" },
    { id: 1, titulo: "teste2", texto: "textao" },
  ];
  return (
    <div style={{ minHeight: "800px", maxHeight: "100%", height: "100%",padding:"1rem 2rem",fontFamily:"Maven Pro" }}>
      <h1 className="text-center mt-2 mb-3">Sobre</h1>
{
  sobre.length? 
  sobre.map((item)=>(
    <div key={item.id} className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panelsStayOpen-collapse${item.id}`}
              aria-expanded="false"
              aria-controls={`panelsStayOpen-collapse${item.id}`}
            >
              {item.titulo} <small style={{fontSize:"0.75rem"}} className="text-muted ms-5">Expandir...</small>
            </button>
          </h2>
          <div
            id={`panelsStayOpen-collapse${item.id}`}
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">{item.texto}</div>
          </div>
        </div>
      </div>
  )) :
  (<p>Carregando...</p>)
}
      
    </div>
  );
};

export default Sobre;
