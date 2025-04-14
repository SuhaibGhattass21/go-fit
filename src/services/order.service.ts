import { Types } from "mongoose";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { IOrder, IOrderItem } from "../interfaces/IOrder";
import { OrderStatus } from "../types/orderStatus";

export class OrderService {

    static async createOrder(
        userId: string | Types.ObjectId,
        items: { productId: string | Types.ObjectId; quantity: number }[],
        shippingAddress: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        }
    ): Promise<IOrder> {
        try {
            const orderItems: IOrderItem[] = [];
            let totalAmount = 0;
        
            for (const item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
                }
                if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
                }
        
                orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                });
        
                product.stock -= item.quantity;
                await product.save();
                totalAmount += product.price * item.quantity;
            }
        
            const order = new Order({
                user: userId,
                items: orderItems,
                totalAmount,
                status: OrderStatus.Pending,
                shippingAddress,
            });
            await order.save();
        
            await order.populate([{ path: "user" }, { path: "items.product" }]);
            return order;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
            throw new Error("Error creating order: An unknown error occurred");
        }
    }

    static async updateOrder(
        orderId: string | Types.ObjectId,
        updates: Partial<{
            status: OrderStatus;
            shippingAddress: {
                street: string;
                city: string;
                state: string;
                postalCode: string;
                country: string;
            };
        }>
    ): Promise<IOrder | null> {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
        
            Object.assign(order, updates);
            await order.save();
        
            await order.populate([{ path: "user" }, { path: "items.product" }]);
            return order;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error updating order: ${error.message}`);
            }
            throw new Error("Error updating order: An unknown error occurred");
        }
    }

    static async deleteOrder(orderId: string | Types.ObjectId): Promise<void> {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error("Order not found");
            }
        
            // Restore product stock before deleting the order
            for (const item of order.items) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
            await Order.findByIdAndDelete(orderId);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting order: ${error.message}`);
            }
            throw new Error("Error deleting order: An unknown error occurred");
        }
    }

    static async getOrders(userId?: string | Types.ObjectId): Promise<IOrder[]> {
        try {
            const query = userId ? { user: userId } : {};
            const orders = await Order.find(query)
                .populate("user")
                .populate("items.product");
            return orders;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching orders: ${error.message}`);
            }
            throw new Error("Error fetching orders: An unknown error occurred");
        }
    }

    static async getOrderById(orderId: string | Types.ObjectId): Promise<IOrder | null> {
        try {
            const order = await Order.findById(orderId);
            if (order) {
                await order.populate([{ path: "user" }, { path: "items.product" }]);
            }
            if (!order) {
                throw new Error("Order not found");
            }
            return order;
        } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching order: ${error.message}`);
        }
        throw new Error("Error fetching order: An unknown error occurred");
        }
    }
}

