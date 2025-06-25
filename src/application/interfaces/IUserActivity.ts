import { Document, Types } from "mongoose";

export interface IUserActivity extends Document {
    user: Types.ObjectId;
    product: Types.ObjectId;
    activityType: "view" | "purchase" | "cart" | "wishlist";
    count: number;
    lastActivity: Date;
}