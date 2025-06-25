import { Document, Types } from "mongoose";
import { ProductCategory } from "../../domain/enums/categories";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

