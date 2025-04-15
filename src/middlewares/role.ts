import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';

export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
        next();
    };
}