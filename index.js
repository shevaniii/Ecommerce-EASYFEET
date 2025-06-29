import dotenv from 'dotenv'
dotenv.config()
import express from "express" 
import connectDB from './config/db.js'
import cors from 'cors'
import productRoute from './routes/productRoute.js'
import authRoute from './routes/authRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
connectDB()

const app = express()
app.use(cors())
app.use(express.json()) //to parse data into json 
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)   // all authentication routes should have prefix '/auth' .
app.use('/api/auth/cart', cartRoute)
app.use('/api/auth/order' , orderRoute);


const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`server is started at the port ${PORT} `);
})