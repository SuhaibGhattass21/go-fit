import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/IUser';

export const register = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const user = await AuthService.register(email, password);
        res.status(201).json(user.toJSON());
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Server error';
        res.status(400).json({ message });
    }
};

export const login = (req: Request, res: Response) => {
    const user = req.user as IUser;
    const token = AuthService.generateToken(user);
    res.json({ user: user.toJSON(), token });
};