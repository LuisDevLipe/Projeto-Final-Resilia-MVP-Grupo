import { Database } from "../database/index.js"

export async function createTableMensagens(){
    try {
        await Database()
        .then((db)=>{
            db.exec(`CREATE TABLE IF NOT EXISTS mensagens
            (id INTEGER PRIMARY KEY , userId INTEGER,nome TEXT NOT NULL ,email TEXT NOT NULL,assunto TEXT , mensagem TEXT NOT NULL)`)
        })
    } catch (err) {
        console.error(err)

    }
}

class MensagensController {
    async index(_,res){
        try {
            await Database()
            .then(db=>{
                db.all('SELECT * FROM mensagens')
                .then((data)=>{
                    res.json(data)
                })
            })
        } catch (err) {
            console.error(err)
            return res.status(404).json({
                err:"Mensagem não encontrada"
            })
        }
    }
    async show (req,res){
        const {id} = req.params
        try {
            await Database()
            .then(db=>{
                db.all('SELECT * FROM mensagens WHERE userId=(?)',[id])
                .then((data)=>{
                    console.log(data)
                    res.status(200).json(data)
                })
            }) 
        } catch (err) {
            console.error(err)
            return res.status(404).json({
                err:"Mensagem não encontrada"
            })
        }
    }
    async create(req,res){
        const{id} = req.params
        const {userId,nome,email,assunto,mensagem} = req.body
        try {
            await Database()
            .then((db)=>{
                db.run('INSERT INTO mensagens(userId,nome,email,assunto,mensagem)VALUES(?,?,?,?,?)',[userId,nome,email,assunto,mensagem])
                .then((data)=>res.status(201).json(data.changes))
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                err:"Erro interno no servidor"
            })
        }
    }
}
export default new MensagensController()