import { Document, Schema } from 'mongoose';
import { Types } from 'mongoose';
import { IProduct } from './IProduct';

export interface ICartItem {
    product: Types.ObjectId | IProduct;
    quantity: number;
}

export interface ICart extends Document {
    user: Schema.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}