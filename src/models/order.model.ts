// src/models/order_model.ts
import { Schema, model } from "mongoose";
import { OrderStatus } from "../types/orderStatus"; 
import { IOrder } from "../interfaces/IOrder";

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    items: [
        {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product", 
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true,
        default: OrderStatus.Pending,
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
},
{
    timestamps: true,
}
);

export const Order = model<IOrder>("Order", orderSchema);

