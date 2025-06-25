// adminUserController.ts
import { Request, Response } from 'express';
import { User } from '../../../infrastructure/database/models/user.model';
import { Order } from '../../../infrastructure/database/models/order.model';

export const getDiscountEligibleUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveredOrders = await Order.find({ status: 'delivered' }).distinct('user');
        const eligibleUsers = await User.find(
            { _id: { $in: deliveredOrders } },
            { _id: 1, name: 1, email: 1 }
        );

        res.status(200).json({
            success: true,
            count: eligibleUsers.length,
            data: eligibleUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch discount eligible users',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};