import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: [
    'https://ecommerce-easyfeet.vercel.app',
    'https://ecommerce-easyfeet-shevaniiis-projects.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EasyFeet API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'EasyFeet API' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});