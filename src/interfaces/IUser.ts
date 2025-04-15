import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}