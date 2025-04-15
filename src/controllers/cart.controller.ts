import { Request, Response, NextFunction } from 'express';
import CartService from '../services/cart.service';
import { IUser } from '../interfaces/IUser';


interface AuthRequest extends Request {
    user?: IUser;
}

export class CartController {
    static async addItemToCart(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const { productId, quantity } = req.body;
            if (!productId || !quantity || quantity < 1) {
                return res.status(400).json({ success: false, message: 'Invalid request: productId and quantity (minimum 1) are required' });
            }
            const cart = await CartService.addItemToCart(userId, productId, quantity);
            return res.status(200).json({ success: true, data: cart });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }

    static async getCart(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const cart = await CartService.getCart(userId);
            return res.status(200).json({ success: true, data: cart });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }

    static async updateItemQuantity(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const productId = req.params.productId;
            const { quantity } = req.body;
            if (!quantity || quantity < 1) {
                return res.status(400).json({ success: false, message: 'Invalid quantity: must be at least 1' });
            }
            const cart = await CartService.updateItemQuantity(userId, productId, quantity);
            return res.status(200).json({ success: true, data: cart });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }

    // Remove an item from the cart
    static async removeItemFromCart(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const productId = req.params.productId;
            const cart = await CartService.removeItemFromCart(userId, productId);
            return res.status(200).json({ success: true, data: cart });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }

    // Clear the cart
    static async clearCart(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?._id.toString();
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            await CartService.clearCart(userId);
            return res.status(200).json({ success: true, message: 'Cart cleared' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ success: false, message: errorMessage });
        }
    }
}