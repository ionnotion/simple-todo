import express, {Express} from "express"
import dotenv from 'dotenv'
import router from "./routes"
import cors from "cors"
dotenv.config()

const app: Express = express()
const port: String = process.env.PORT || "3000"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(port, ()=>{
    console.log(`Typescript Server listening on port: ${port}`)
})