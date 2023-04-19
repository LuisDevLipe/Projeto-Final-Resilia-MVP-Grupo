import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import authConfig from "../config/auth.js"
import { Database } from "../database/index.js"

class SessionsController {
  async create(req, res) {
    try {
      const { email, password } = req.body;
      let userPasswordDB = "";
      let user = {};
      await Database()
        .then((db) => {
          return db.get(
            "SELECT id,nome,cpf,idade,email,password FROM users WHERE email=?",
            [email]
          );
        })
        .then((response) => {
          userPasswordDB = response.password;
          user = response;
        });

      const checkPassword = bcrypt.compare(
        password,
        userPasswordDB,
        (err, data) => {
          if (err) throw err;
          if (data) {
            console.log({ msg: "Login Sucess" });
            const { id, nome, cpf, idade } = user;
            console.log(user);
            return res.json({
              user: {
                id,
                email,
                nome,
                cpf,
                idade,
              },
              token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
              }),
            });
          } else {
            console.log({ msg: "Invalid Credential" });
            res.status(401).json({message:"Usuário ou senha incorretos"})
          }
          return true;
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
}
export default new SessionsController();
