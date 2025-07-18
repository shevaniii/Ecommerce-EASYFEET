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
 // Enable CORS for all routes or specific routes
    app.use(cors({
      origin: 'https://ecommerce-easyfeet-shevaniiis-projects.vercel.app',
      methods: ['GET','POST','PUT','DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true // If you need to send cookies
    }));
// app.use((req, res, next) => {
//           res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-easyfeet-shevaniiis-projects.vercel.app');
//           res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//           res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//           next();
//         });
app.use(express.json()) //to parse data into json 
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)   // all authentication routes should have prefix '/auth' .
app.use('/api/auth/cart', cartRoute)
app.use('/api/auth/order' , orderRoute);
const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`server is started at the port ${PORT} `);
})