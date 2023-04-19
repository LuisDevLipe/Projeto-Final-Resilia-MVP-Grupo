import {createPasswordHash}   from '../services/auth.js'
import { Database } from "../database/index.js";

export async function createTablePessoas(){
    Database().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Users ( id INTEGER PRIMARY KEY, nome TEXT,email TEXT, idade INTEGER ,cpf INTEGER ,password TEXT)')
    })
}
class UsersController {

    async index(req, res){
        try {
            await Database()
             .then(db=>{
             db.all('SELECT * FROM users')
             .then((usersDb)=> {
                res.json(usersDb)
             })
         })
        } catch (err) {
            console.error(err)
            return res.status(500)
            .json({
                error:"internal server error!!"
            })   
        }
}
    async  show(req, res){
        try {
            // let id = req.body.id;
            const { id } = req.params
            const user = await Database().then(db=>{
            return db.get('SELECT * FROM users WHERE id=?',[id])
            .then((userGet)=> {
                return (!userGet? null : userGet)
            })
        });
        if(!user){
            return res.status(404).json({
                error:"Not Found"
            })
        }
        return res.status(200).json(user)
    } catch (err) {
            console.error(err)
            return res.status(500)
            .json({
                error:"internal server error!!"
            })  
        }
}
    async  create(req, res){
        try {
            const {nome,email,idade,cpf,password} = req.body
            const user = await Database().then(db=>{
                return db.get('SELECT email FROM users WHERE email=?', [email])
                .then((email)=> {
                    return (!email? null : email)
                })
            });
            if(user){
                return res.status(422)
                .json({
                    message:`User: ${email} already exists`
                })
            }
            // // se o usuário não existe então criptografa o password
            const encryptedPassword = await createPasswordHash(password)
            await Database().then(db=>{
                db.run('INSERT INTO users (nome,email,idade,cpf,password) VALUES (?,?,?,?,?)', [nome, email,idade,cpf,encryptedPassword])
                .then((user)=> {
                })
            });
            return res.status(201).json(req.body)
        } catch (err) {
            console.error(err)
            return res.status(500)
                .json({
                    error:"internal server error!!"
                })
        }
    }
    async update(req,res){
    try {
        const { id } = req.params
        const { nome,email ,idade,cpf, password } = req.body
        const encryptedPassword = await createPasswordHash(password)
        const user = await Database().then(db=>{
           return db.run(`UPDATE users SET nome="${nome}",email="${email}",idade=${idade},cpf=${cpf},password="${encryptedPassword}" WHERE id=${id}`)
        })
        !!user.changes? res.status(200).json(req.body) : res.status(404).json({err:"Something bad happened to this request"})
    } catch (err) {
        console.error(err)
            return res.status(500)
            .json({
                error:"internal server error!!"
            })
    }
    }
    async destroy(req,res){
        try {
            const { id } = req.params
            const user = await Database().then(db=>{
            return db.run(`DELETE FROM users WHERE id=?`,[id])
                .then(res=>res.changes)
            })
            !!user? res.status(200).json() : res.status(404).json({err:"Something Bad happened to this request"})
        } catch (err) {
            console.error(err)
            return res.status(500)
            .json({
                error:"internal server error!!"
            })
        }
    }
}
export default new UsersController()