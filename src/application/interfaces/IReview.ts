import { Document, Types } from "mongoose";

export interface IReview extends Document {
    _id: Types.ObjectId;
    product: Types.ObjectId;
    user: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
