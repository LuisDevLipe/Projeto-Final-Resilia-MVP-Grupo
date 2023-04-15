import React,{useState,useEffect,useContext} from "react"
import { Link} from 'react-router-dom'
import "./MeusCartoes.css"
import Cartoes from "../../components/Cartoes/Cartoes"
import { getCartoes,CreateCartao,destroyCartao } from "../../services/api"
import { AuthContext } from "../../contexts/auth"

const MeusCartoes = () => {
  
  const {user} = useContext(AuthContext)
  const [cartoes,setCartoes] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingError,setLoadingError] =  useState(false)
  const [cardError,setCardError] = useState({})

  const loadData = async (query = '') => {
    try {
      const response = await getCartoes(user?.id,query)
      setCartoes(response.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoadingError(true)
    }
  }
  useEffect(()=>{
    (async () => await loadData())()
  },[])

  const handleNewCartao = async (cartaoNumero,cartaoTipo)=>{
    try {
      if(!cartaoTipo) return setCardError({message:"Selecione o tipo do cartão"})
      if(cartaoNumero.length < 13) return setCardError({message:"Parece que você esqueceu alguns dígitos... :) Um cartão válido possui 13 dígitos"})
      await CreateCartao(user?.id,cartaoNumero,cartaoTipo)
      await loadData()
      setCardError({})
    } catch (err) {
      console.error(err)
      setLoadingError(true)
      setCardError(err.response.data)
      console.log(cardError)
    }
  }
  const handleDeleteCartao = async(id)=> {
    await destroyCartao( user?.id,id)
    await loadData()
  }

  if(loadingError){
    <div className="loading">
      Erro ao carregar os dados de repositório.<Link to='/'>Voltar</Link>
    </div>
  }
  if(loading){
    return(
      <div className="loading">
        Carregando...
      </div>
    )
  }
  return (
    <div className="main">
      <Cartoes 
      cardError={cardError}
      cartoes={cartoes}
      onDeleteCartao={handleDeleteCartao}  
      onNewCartao={handleNewCartao}
      />
    </div>
  );
};

export default MeusCartoes