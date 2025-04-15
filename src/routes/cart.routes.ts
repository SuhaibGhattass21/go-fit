import { Router } from 'express';
import passport from 'passport';
import { CartController } from '../controllers/cart.controller';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

// router.post('/items/', CartController.addItemToCart);
// router.get('/items/:id', CartController.getCart);
// router.put('/items/:productId', CartController.updateItemQuantity);
// router.delete('/items/:productId', CartController.removeItemFromCart);
// router.delete('/items/:id', CartController.clearCart);

export default router;