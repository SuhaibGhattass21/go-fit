import express from 'express';
import passport from 'passport';
import connectDB from './config/db';
import env from './config/env'
import Routes from '../src/routes';
import './config/passport';

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());

app.use('/api', Routes);

const PORT = env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));