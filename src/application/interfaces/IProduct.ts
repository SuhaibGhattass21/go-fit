import { Document, Types } from "mongoose";
import { ProductCategory } from "../../domain/enums/categories";


export interface IBundleItem {
    product: Types.ObjectId;
    quantity: number;
}

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    imageUrl?: string;
    averageRating: number;
    reviewsCount: number;
    nutritionalInfo: Map<string, any>;
    isBundle: boolean;
    bundleProducts: IBundleItem[];

    createdAt: Date;
    updatedAt: Date;
}

