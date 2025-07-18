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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-easyfeet.vercel.app", 
    ],
     methods: 'GET,HEAD,PUT,POST,DELETE',
    credentials: true,
    optionSuccessStatus:200
  })
);
app.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-easyfeet-shevaniiis-projects.vercel.app');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          next();
        });
app.use(express.json()) //to parse data into json 
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)   // all authentication routes should have prefix '/auth' .
app.use('/api/auth/cart', cartRoute)
app.use('/api/auth/order' , orderRoute);
const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`server is started at the port ${PORT} `);
})