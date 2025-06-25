import { Types } from 'mongoose';
import { Cart } from '../../infrastructure/database/models/cart.model';
import { Product } from '../../infrastructure/database/models/product.model';
import { ICart } from '../../application/interfaces/ICart';

class CartService {
    static async addItemToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }

            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: new Types.ObjectId(productId), quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error adding item to cart: ${message}`);
        }
    }

    static async getCart(userId: string): Promise<ICart | { user: string; items: [] }> {
        try {
            const cart = await Cart.findOne({ user: userId }).populate('items.product');
            if (!cart) {
                return { user: userId, items: [] };
            }
            return cart;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error fetching cart: ${message}`);
        }
    }

    static async updateItemQuantity(userId: string, productId: string, newQuantity: number): Promise<ICart> {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const item = cart.items.find(item => item.product.toString() === productId);
            if (!item) {
                throw new Error('Item not found in cart');
            }

            item.quantity = newQuantity;
            await cart.save();
            return cart;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error updating cart item quantity: ${message}`);
        }
    }

    static async removeItemFromCart(userId: string, productId: string): Promise<ICart> {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error removing item from cart: ${message}`);
        }
    }

    static async clearCart(userId: string): Promise<{ message: string }> {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (cart) {
                cart.items = [];
                await cart.save();
            }
            return { message: 'Cart cleared' };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error clearing cart: ${message}`);
        }
    }
}

export default CartService;