import express, { Request, Response } from 'express';
import passport from 'passport';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

/** @openapi
* /register:
*   post:
*     summary: Register a new user
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       201:
*         description: User registered successfully
*       400:
*         description: Bad request
*/
router.post('/register', register);


/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', passport.authenticate('local', { session: false }), login);

//for testing
router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response): any => {
        return res.json({ message: 'You have access to this protected route', user: req.user });
    }
);

export default router;