// src/models/product_model.ts
import { Schema, model } from "mongoose";
import { IProduct } from "../../../application/interfaces/IProduct";
import { ProductCategory } from "../../../domain/enums/categories";

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            enum: Object.values(ProductCategory),
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model<IProduct>("Product", productSchema);