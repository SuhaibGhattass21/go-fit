import express, { Request, Response } from 'express';
import * as passport from 'passport';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);

router.post('/login', passport.authenticate('local', { session: false }), login);

router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response): any => {
        return res.json({ message: 'You have access to this protected route', user: req.user });
    }
);

export default router;