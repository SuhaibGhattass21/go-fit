import express from 'express';
import passport from 'passport';
import connectDB from './infrastructure/database/mongodb/db';
import env from './interfaces/config/env'
import Routes from './interfaces/http/routes';
import './config/passport';
import cors from 'cors';
import { logger } from './infrastructure/utils/logger';
import swaggerSpec from './interfaces/config/swagger/swagger';
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
app.get('/api-docs/', (req, res) => res.redirect('/api-docs'));
app.get('/', (req, res) => res.redirect('/api-docs'));
app.get('/api-docs.json', (_: any, res: any) => res.json(swaggerSpec));

app.use('/health', (_: any, res: any) => res.status(200).send('OK'));

connectDB().then(
    (_) => {
        const PORT = env.PORT || 3000;
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
    }
);

