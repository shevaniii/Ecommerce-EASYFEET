import express from "express" 
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import productRoute from './routes/productRoute.js'
dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json()) //to parse data into json 
app.use('/api/products', productRoute)

app.get("/", (req, res)=>{
    res.send("server is running");
})
app.get('/', ()=>{})
const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`server is started at the port ${PORT} `);
})