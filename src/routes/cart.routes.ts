import { Router } from 'express';
import passport from 'passport';
import { CartController } from '../controllers/cart.controller';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/items/', (req: any, res, next) => CartController.addItemToCart(req, res, next));
router.get('/items/:id', (req: any, res, next) => CartController.getCart(req, res, next));
router.put('/items/:productId', (req: any, res, next) => CartController.updateItemQuantity(req, res, next));
router.delete('/items/:productId', (req: any, res, next) => CartController.removeItemFromCart(req, res, next));
router.delete('/items/:id', (req: any, res, next) => CartController.clearCart(req, res, next));

export default router;