import { Schema, model } from "mongoose";
import { IReview } from "../interfaces/IReview";

const reviewSchema = new Schema<IReview>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export const Review = model<IReview>("Review", reviewSchema);
