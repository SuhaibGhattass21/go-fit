import { Schema, model } from "mongoose";
import { IUserActivity } from "../interfaces/IUserActivity";

const userActivitySchema = new Schema<IUserActivity>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        activityType: {
            type: String,
            enum: ["view", "purchase", "cart", "wishlist"],
            required: true,
        },
        count: {
            type: Number,
            default: 1,
        },
        lastActivity: {
            type: Date,
            default: Date.now,
        },
    }
);

userActivitySchema.index({ user: 1, product: 1, activityType: 1 }, { unique: true });

export const UserActivity = model<IUserActivity>("UserActivity", userActivitySchema);
