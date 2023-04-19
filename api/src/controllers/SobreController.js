import { Database } from "../database/index.js"

export async function createTableSobre(){
    try {
        await Database().then((db)=>{
            db.exec("CREATE TABLE IF NOT EXISTS Sobre (id INTEGER PRIMARY KEY,titulo TEXT,texto TEXT)")
        })
    } catch (err) {
        console.error(err)
    }
}

class SobreController {
    async index(_,res) {
        await Database().then((db)=>{
            db.all("SELECT * FROM Sobre")
            .then((data)=>{
                res.status(200).json(data)
            })
        })
    }
    async create (req,res){
        const {titulo , texto } = req.body
        await Database().then((db)=>{
            db.run("INSERT INTO Sobre (titulo,texto) VALUES(?,?)",[titulo,texto])
            .then((data)=>{
                res.status(201).json(data.changes)
            })
        })
    }
    async destroy (req,res){
        const {id} = req.params
        await Database().then((db)=>{
            db.run("DELETE FROM Sobre WHERE id=?",[id])
            .then((data)=>{
                res.status(200).json(data.changes)
            })
        })
    }
    async update (req,res){
        const {id} = req.params
        const {titulo,texto} = req.body
        await Database().then((db)=>{
            db.run("UPDATE Sobre SET titulo=?,texto=? WHERE id=?",[titulo,texto,id])
            .then((data)=>{
                res.status(200).json(data.changes)
            })
        })
    }
}
export default new SobreController()