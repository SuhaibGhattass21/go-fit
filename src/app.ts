import express from 'express';
import passport from 'passport';
import connectDB from './config/db';
import env from './config/env'
import Routes from './routes/index';
import './config/passport';
import cors from 'cors';
import { logger } from './utils/logger';
import swaggerSpec from './config/swagger';
import swaggerUI from 'swagger-ui-express';

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
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health', (_: any, res: any) => res.status(200).send('OK'));

connectDB().then(
    (_) => {
        const PORT = env.PORT || 3000;
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    }
);

