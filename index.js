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

// Configure allowed origins
const allowedOrigins = [
  'https://ecommerce-easyfeet.vercel.app',
  'https://ecommerce-easyfeet-shevaniiis-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

// Enable CORS for multiple origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json()) //to parse data into json 

// Mount routes in specific order to avoid conflicts
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)   // authentication routes
app.use('/api/cart', cartRoute)   // cart routes (removed /auth prefix to avoid conflicts)
app.use('/api/orders', orderRoute); // order routes (removed /auth prefix and changed to plural)

const PORT = process.env.PORT || 3001
app.listen(PORT , ()=>{
    console.log(`server is started at the port ${PORT} `);
})