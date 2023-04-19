import { Database } from "../database/index.js"

export async function createTableCartoes(){
    try {
        await Database().then((db)=>{
            db.exec("CREATE TABLE IF NOT EXISTS Cartoes (id INTEGER PRIMARY KEY,numero INTEGER,tipo TEXT,userId INTEGER)")
        })
    } catch (err) {
        console.error(err)
    }
}

class CartoesController {
    async index(req,res){
        try {
            const { user_id } = req.params
            const { q } = req.query
            if(!q){
                await Database().then((db)=>{
                   return db.all("SELECT * FROM Cartoes WHERE userId=?",[user_id])
                    .then((cartao)=>{
                        cartao? res.status(200).json(cartao) : res.status(404).json({
                            error:"Houve algo de errado com a busca"
                        }),null
                    }) 
                })
            }
            let query = q
            if(q){
                await Database().then((db)=>{
                    return db.all(`SELECT * FROM Cartoes WHERE userId=? AND numero LIKE("%${query}%") `,[user_id])
                    .then((cartaoQ)=>{
                        return cartaoQ? res.status(200).json(cartaoQ) : res.status(404).json({
                            error:"Houve algo de errado com a busca"
                        })
                    })
                }) 
                // console.log(cartaoQuery)
            }
            // const user = await User.findById(user_id)
            // if(!user){
            //     return res.status(404).json()
            // }
            // const repositories = await Repository.find({
            //     userId : user_id,
            //     ...query
            // })
            // return res.json(repositories)
        } catch (err) {
            console.error(err)
            return res.status(500)
            .json({
                error:"internal server error!!"
            })
        }
        }
        async create(req,res){
            try {
                const { user_id} = req.params
                const { numero,tipo } = req.body

                const cartaoVerifica = await Database().then((db)=>{
                    return db.get("SELECT numero,userId FROM Cartoes WHERE numero=?",[numero])
                    .then((cartaoRes)=>{
                         return (cartaoRes? res.status(422).json({message:`Cartao numero ${numero} Inválido/pertence a outro usuário`})
                        : false)
                    })
                })
                if(!cartaoVerifica){
                    Database().then((db)=>{
                        db.run("INSERT INTO Cartoes(numero,tipo,userId) VALUES (?,?,?)",[numero,tipo,user_id])
                        .then((cartaoRes)=>{
                            !!cartaoRes.changes? res.status(201).json(cartaoRes) : res.status(500).json({
                                error:"Erro ao adcionar cartão"
                            })
                        })
                    })

                }
             
                // const user = await User.findById(user_id)
                // if(!user){
                //     return res.status(404).json()
                // }

                // const repository = await Repository.findOne({
                //     userId: user_id,
                //     url
                // })
                // if(repository){
                //     return res
                //     .status(422)
                //     .json({
                //         message:`Repository ${name} already exists`
                //     })
                // }
                // const newRepository = await Repository.create({
                //     name,
                //     url,
                //     userId: user_id
                // })
                // return res.status(201).json(newRepository)
            } catch (err) {
                console.error(err)
                return res.status(500).json({
                    error: "Internal server error!!"
                })
            }
        }
        async destroy(req,res){
            try {
                const { user_id,id} = req.params
                await Database().then((db)=>{
                    return db.run("DELETE FROM Cartoes WHERE id=? AND userId=?",[id,user_id])
                    .then((resp)=>{
                        const response = !!resp.changes
                        response?res.status(200).json({message:"Deleteado com sucesso"})
                        : res.status(404).json({err:"algum parâmetro não foi encontrado"})
                    })
                })
            } catch (err) {
                console.error(err)
                return res.status(500).json({
                    error: "Internal server error!!"
                })
            }
            // try {
            //     const { user_id,id} = req.params
               
            //     const user = await User.findById(user_id)
            //     if(!user){
            //         console.log('travo no user')
            //         return res.status(404).json()
            //     }
            //     const repository = await Repository.findOne({
            //         userId: user_id,
            //         _id: id
            //     })

            //     if (!repository){
            //         console.log('travo no repository')
            //         console.log(user_id,id)
            //         console.log(repository)
            //         return res
            //         .status(404)
            //         .json()
            //     }
            //     await repository.deleteOne()
            //      return res.status(200).json()
            // } catch (err) {
            //     console.error(err)
            //     return res.status(500).json({
            //         error: "Internal server error!!"
            //     })
            // }
        }
}

export default new CartoesController()