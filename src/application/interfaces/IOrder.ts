// src/interfaces/order.ts
import { Document, Types } from "mongoose";
import { OrderStatus } from "../../domain/enums/orderStatus";
import { IProduct } from "../interfaces/IProduct";
import { IUser } from "../interfaces/IUser";

export interface IOrder extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId | IUser;
    items: IOrderItem[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    product: Types.ObjectId | IProduct;
    quantity: number;
    price: number;
}

