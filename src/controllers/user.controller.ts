import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { UserService } from "../services/user.service"; 

export class UserController {

    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, firstName, lastName, phone, address } = req.body;
        
            if (!email || !password || !firstName || !lastName) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields: email, password, firstName, lastName",
                });
            }
        
            const user = await UserService.createUser(email, password, firstName, lastName, phone, address);
            res.status(201).json({
                success: true,
                data: user,
            });
        } catch (error: unknown) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            if (!Types.ObjectId.isValid(userId)) {
                    res.status(400).json({
                    success: false,
                    message: "Invalid user ID",
                });
            }
            const updates = req.body;
            const updatedUser = await UserService.updateUser(userId, updates);
            res.status(200).json({
                success: true,
                data: updatedUser,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "User not found" ? 404 : 500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            if (!Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid user ID",
                });
            }
            await UserService.deleteUser(userId);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "User not found" ? 404 : 500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    }

    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserService.getUsers();
            res.status(200).json({
                success: true,
                data: users,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "User not found" ? 404 : 500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    }

    static async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            if (!Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid user ID",
                });
            }
            const user = await UserService.getUserById(userId);
            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "User not found" ? 404 : 500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    }
}