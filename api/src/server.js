<<<<<<< Updated upstream
import app from './app'
=======
import App from './app.js'
>>>>>>> Stashed changes
const PORT = 5001

App.listen(PORT,
    ()=>{
        console.log(
            `http://localhost:${PORT}`
        )
    })