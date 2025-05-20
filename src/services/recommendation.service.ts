import { Types } from "mongoose";
import { Product } from "src/models/product.model";
import { UserActivity } from "src/models/user-activity.model";

export class RecommendationService {
    static async getRecommendationsForUser(userId: string, limit: number = 5): Promise<any[]> {
        const userInterests = await UserActivity.aggregate([
            { $match: { user: new Types.ObjectId(userId) } },
            { $lookup: { from: "products", localField: "product", foreignField: "_id", as: "productInfo" } },
            { $unwind: "$productInfo" },
            {
                $group: {
                    _id: "$productInfo.category",
                    score: {
                        $sum: {
                            $cond: [
                                { $eq: ["$activityType", "purchase"] }, 10, // if purchase
                                {
                                    $cond: [
                                        { $eq: ["$activityType", "cart"] }, 5, // if cart
                                        1 // else 1
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            { $sort: { score: -1 } },
            { $limit: 3 }
        ]);
        
        const categories = userInterests.map(item => item._id);
        
        const purchasedProductIds = await UserActivity.distinct("product", {
            user: new Types.ObjectId(userId),
            activityType: "purchase"
        });
        
        const recommendations = await Product.find({
            category: { $in: categories },
            _id: { $nin: purchasedProductIds }
        })
        .sort({ averageRating: -1 })
        .limit(limit);
        
        return recommendations;
    }
    
    static async getSimilarProducts(productId: string, limit: number = 4): Promise<any[]> {
        const product = await Product.findById(productId);
        if (!product) return [];
        
        return Product.find({
            category: product.category,
            _id: { $ne: new Types.ObjectId(productId) }
        })
        .sort({ averageRating: -1 })
        .limit(limit);
    }
}
