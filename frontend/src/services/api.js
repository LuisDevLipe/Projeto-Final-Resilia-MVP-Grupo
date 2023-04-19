import axios from 'axios'
const local = "http://localhost:5001"
const render = "https://api-mvp-resilia.onrender.com"
export const API = axios.create({
    baseURL:render,
    
})
API.defaults.timeout = 10000
export const createUser = async (nome,cpf,email,password)=> {
    return API.post('/users',{nome,cpf,email,password})
}
export const deleteUser = async (userId) => {
    return API.delete(`/users/${userId}`)
}
export const updateUser = async (userId,nome,email,idade,cpf,password) => {
    return API.put(`/users/${userId}`,{nome,email,idade,cpf,password})
}
export const createSession = async(email,password)=> {
    return API.post('/sessions',{email,password})
}
export const getCartoes = async(userId,query) => {
    let url = `/users/${userId}/Cartoes/`
    if(query !== ''){
        url += `?q=${query}`
    }
    //http://localhost:500/users/ID/repositories/?q=consulta
    return API.get(url)
}
export const CreateCartao= async (userId,cartaoNumero,cartaoTipo)=> {
    const url = `/users/${userId}/Cartoes`
    return API.post(url,{numero:cartaoNumero,tipo:cartaoTipo,userId})
}
export const destroyCartao = async (userId,id)=> {
    const url = `/users/${userId}/Cartoes/${id}`
    return API.delete(url)
}

export const createMensagem = (userId,mensagemSend) => {
    const defaultUser = 69420
    if(userId){
        return API.post(`/users/${userId}/mensagens`,mensagemSend)
    } else {
        return API.post(`/users/${defaultUser}/mensagens`,mensagemSend)
    }
}
export const postarSobre = (titulo,texto)=> {
    return API.post(`/admin/sobre`,{titulo,texto},(res)=>{
        console.log(res)
    })
}
export const getSobre = async ()=>{
    return API.get("/sobre")
}
export const deleteSobre = (id)=>{
    return API.delete(`/admin/sobre/${id}`)
}
export const updateSobre = (id,titulo,texto)=>{
    return API.put(`/admin/sobre/${id}`,{titulo,texto})
}
