import express from 'express';
import passport from 'passport';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import './config/passport';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));