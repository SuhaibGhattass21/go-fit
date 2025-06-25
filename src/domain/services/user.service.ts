import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { User } from "../../infrastructure/database/models/user.model";
import { IUser } from "../../application/interfaces/IUser";

export class UserService {

    static async createUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone?: string,
        address?: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        }
    ): Promise<IUser> {
        try {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                email: email.toLowerCase(),
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                address,
            });
            await user.save();
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async updateUser(
        userId: string | Types.ObjectId,
        updates: Partial<{
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            phone: string;
            address: {
                street: string;
                city: string;
                state: string;
                postalCode: string;
                country: string;
            };
        }>
    ): Promise<IUser | null> {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            if (updates.password) {
                const saltRounds = 10;
                updates.password = await bcrypt.hash(updates.password, saltRounds);
            }

            if (updates.email && updates.email.toLowerCase() !== user.email) {
                const existingUser = await User.findOne({ email: updates.email.toLowerCase() });
                if (existingUser) {
                    throw new Error("User with this email already exists");
                }
            }

            Object.assign(user, updates);
            await user.save();
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async deleteUser(userId: string | Types.ObjectId): Promise<void> {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error("User not found");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async getUsers(): Promise<IUser[]> {
        try {
            const users = await User.find();
            return users;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async getUserById(userId: string | Types.ObjectId): Promise<IUser | null> {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }

    static async validatePassword(email: string, password: string): Promise<IUser> {
        try {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid email or password");
            }

            return user;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error("Error fetching users: Unknown error");
        }
    }
}