import express from 'express';
import cors from 'cors';

const app = express();

// Basic CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Test route with parameter
app.get('/test/:id', (req, res) => {
  res.json({ message: `Test route with ID: ${req.params.id}` });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
});