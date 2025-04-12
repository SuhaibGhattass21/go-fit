import { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json(user.toJSON());
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = (req: Request, res: Response) => {
    const user = req.user as IUser;

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '4h',
    });

    res.json({ user: user.toJSON(), token });
};