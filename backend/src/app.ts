import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './db';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import userRoutes from './routes/users';
import orderRoutes from './routes/orders';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/checkout', orderRoutes);

export default app;