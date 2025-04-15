import { User } from '../models/user.model';
import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export class AuthService {
    static async register(userData: IUser): Promise<IUser> {
        if (!userData.email || !userData.password) {
            throw new Error('Email and password are required');
        }

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const user = new User(userData);
        await user.save();
        return user;
    }

    static generateToken(user: IUser): string {
        return jwt.sign({ sub: user._id, role: user.role }, env.JWT_SECRET as string, {
            expiresIn: '4h',
        });
    }
}