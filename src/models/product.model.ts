import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/IProduct";
import { ProductCategory } from "../types/categories";

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
    nutritionalInfo: {
        type: Map,
        of: Schema.Types.Mixed,
        default: {},
    },
    imageUrl: {
        type: String,
        required: false,
    },
    averageRating: {
        type: Number,
        required: false,
        min: 0,
        max: 5,
        default: 0,
    },
    reviewsCount: {
        type: Number,
        min: 0,
        default: 0,
    },
        isBundle: {
        type: Boolean,
        default: false,
    },
    bundleProducts: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }],
},
{
    timestamps: true, 
}
);

export const Product = model<IProduct>("Product", productSchema);