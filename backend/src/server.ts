import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import userRoutes from './routes/users';
import orderRoutes from './routes/orders';
import { seedProducts, sampleProducts } from './data/seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// enable CORS for frontend dev server
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// simple root
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Mock E-commerce API is running' });
});

// seed endpoint (manual trigger)
app.get('/api/seed', async (_req, res) => {
  try {
    await seedProducts();
    res.status(200).json({ seeded: true });
  } catch (err) {
    res.status(500).json({ seeded: false, error: err });
  }
});

// If DB connects, mount full routes; if DB connection fails, mount a fallback /api/products that returns sample data
connectDB().then(() => {
    // mount API routes
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/checkout', orderRoutes);

    // log available endpoints (quick visibility)
    console.log('Mounted API routes: /api/products, /api/cart, /api/users, /api/checkout, /api/seed');

    app.listen(PORT, () => {
        console.log(`Server (with DB) is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection failed; starting server with fallback routes:', err);

    // fallback product endpoint (no DB)
    app.get('/api/products', (_req, res) => {
        res.status(200).json(sampleProducts);
    });

    // keep minimal cart stub to avoid frontend errors
    app.get('/api/cart', (_req, res) => {
        res.status(200).json({ items: [], totalPrice: 0 });
    });

    app.listen(PORT, () => {
        console.log(`Server (fallback) is running on http://localhost:${PORT}`);
        console.log('Fallback endpoints: GET /api/products, GET /api/cart, GET /api/seed');
    });
});