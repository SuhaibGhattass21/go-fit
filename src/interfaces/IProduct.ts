import { Document } from "mongoose";
import { ProductCategory } from "../types/categories";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number; 
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
