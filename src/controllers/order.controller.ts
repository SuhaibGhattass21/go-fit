// src/controllers/order_controllers/order_controller.ts
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { OrderService } from "../services/order.service";

export class OrderController {

    static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, items, shippingAddress } = req.body;

            if (!userId || !items || !Array.isArray(items) || items.length === 0 || !shippingAddress) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields: userId, items, shippingAddress",
                });
            }

            if (!Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid user ID",
                });
            }

            for (const item of items) {
                if (!item.productId || !Types.ObjectId.isValid(item.productId) || !item.quantity || item.quantity < 1) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid item: productId and quantity (minimum 1) are required",
                    });
                }
            }

            const order = await OrderService.createOrder(userId, items, shippingAddress);
            res.status(201).json({
                success: true,
                data: order,
            });
        } catch (error: unknown) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }

    static async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid order ID",
                });
            }
            const updates = req.body;
            const updatedOrder = await OrderService.updateOrder(orderId, updates);
            res.status(200).json({
                success: true,
                data: updatedOrder,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "Order not found" ? 404 : 500).json({
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

    static async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid order ID",
                });
            }
            await OrderService.deleteOrder(orderId);
            res.status(200).json({
                success: true,
                message: "Order deleted successfully",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "Order not found" ? 404 : 500).json({
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

    static async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.query.userId as string | undefined;
            if (userId && !Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid user ID",
                });
            }
            const orders = await OrderService.getOrders(userId);
            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(error.message === "Order not found" ? 404 : 500).json({
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

    static async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid order ID",
                });
            }
            const order = await OrderService.getOrderById(orderId);
            res.status(200).json({
                success: true,
                data: order,
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

    static async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error: unknown) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }

    static async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid order ID",
                });
            }

            const userId = (req as any).user?._id.toString(); // Assuming AuthRequest is used
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            const order = await OrderService.getOrderById(orderId);
            if (!order || order.user.toString() !== userId) {
                res.status(403).json({
                    success: false,
                    message: "User not authorized to cancel this order",
                });
            }

            const cancelledOrder = await OrderService.cancelOrder(orderId);
            res.status(200).json({
                success: true,
                message: "Order cancelled successfully",
            });
        } catch (error: unknown) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }
}

