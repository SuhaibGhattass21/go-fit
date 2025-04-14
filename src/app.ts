import express from 'express';
import passport from 'passport';
import connectDB from './config/db';
import env from './config/env'
import Routes from './routes/index';
import './config/passport';
import cors from 'cors';
import { logger } from './utils/logger';
const app = express();

app.use(
    cors({
        origin: env.NODE_ENV === 'development'
            ? '*'
            : [
                'http://localhost:5500',
                'http://localhost:3000',
                'http://localhost:8080',
                'http://localhost:5173',
            ],
    })
);

app.use(express.json());
app.use(passport.initialize());

app.use('/api', Routes);

connectDB().catch(
    (err) => {
        const PORT = env.PORT || 3000;
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    }
);

