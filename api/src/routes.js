import { Router } from "express"
import CartoesController,{createTableCartoes} from "./controllers/CartoesController.js"
import UsersController,{createTablePessoas} from "./controllers/UsersController.js"
import SessionsController from "./controllers/SessionsController.js"
import MensagensController,{createTableMensagens} from "./controllers/MensagensController.js"
import SobreController,{createTableSobre} from "./controllers/SobreController.js"
import auth from './middlewares/auth.js'
const routes = new Router()
// createTablePessoas()
// createTableCartoes()
// createTableMensagens()
// createTableSobre()
//controllers publicos
routes.post('/sessions'     ,SessionsController.create)
routes.post('/users'        ,UsersController.create)
routes.post('/users/:user_id/mensagens',MensagensController.create)
routes.get('/sobre',SobreController.index)


// //middleware
routes.use(auth)
//-- protegido daqui pra baixo

//controllers privados
routes.get('/users'         ,UsersController.index)
routes.get('/users/:id'     ,UsersController.show)
routes.put('/users/:id'     ,UsersController.update) 
routes.delete('/users/:id'  ,UsersController.destroy) 

routes.get('/users/:user_id/Cartoes'       ,CartoesController.index)
routes.post('/users/:user_id/Cartoes'      ,CartoesController.create)
routes.delete('/users/:user_id/Cartoes/:id',CartoesController.destroy)

routes.get('/mensagens'          ,MensagensController.index)
routes.get('/mensagens/:user_id' ,MensagensController.show)

routes.post('/admin/sobre',SobreController.create)
routes.delete('/admin/sobre/:id',SobreController.destroy)
routes.put("/admin/sobre/:id",SobreController.update)

export default routes
