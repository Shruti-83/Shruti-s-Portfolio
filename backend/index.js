import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRouter from './routes/contact.js';
import portfolioRouter from './routes/portfolio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [process.env.VITE_FRONTEND_URL, 'http://localhost:5173', 'shruti-s-portfolio-git-main-shrutis-projects-05b75c37.vercel.app','shruti-s-portfolio-6g5y07ta9-shrutis-projects-05b75c37.vercel.app'],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing from .env file');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    dbName: 'portfolio',
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,        // ← forces IPv4, fixes most Atlas ECONNREFUSED
  })
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/portfolio', portfolioRouter);

app.get('/', (req, res) =>
  res.json({ message: 'Portfolio API running 🚀', status: 'ok' })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);