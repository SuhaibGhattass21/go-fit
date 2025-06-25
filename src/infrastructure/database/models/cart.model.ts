import { Schema, model } from 'mongoose';
import { ICart } from '../../../application/interfaces/ICart';

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
}, { timestamps: true });

export const Cart = model<ICart>('Cart', cartSchema);