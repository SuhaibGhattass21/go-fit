// src/routes/cart.route.ts
import { Router } from 'express';
import passport from 'passport';
import { CartController } from '../controllers/cart.controller';
const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

/**
 * @openapi
 * /cart/items:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60d5ec59f5a4b91d88e4e8a1"
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: number
 *       400:
 *         description: Invalid request - Missing fields or invalid quantity
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post('/items/', (req: any, res, next) => CartController.addItemToCart(req, res, next));

/**
 * @openapi
 * /cart/items/{id}:
 *   get:
 *     summary: Get the user's cart by user ID
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart to retrieve
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                               stock:
 *                                 type: number
 *                           quantity:
 *                             type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/items/:id', (req: any, res, next) => CartController.getCart(req, res, next));

/**
 * @openapi
 * /cart/items/{productId}:
 *   put:
 *     summary: Update the quantity of an item in the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: number
 *       400:
 *         description: Invalid quantity - Must be at least 1
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.put('/items/:productId', (req: any, res, next) => CartController.updateItemQuantity(req, res, next));

/**
 * @openapi
 * /cart/items/{productId}:
 *   delete:
 *     summary: Remove an item from the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.delete('/items/:productId', (req: any, res, next) => CartController.removeItemFromCart(req, res, next));

/**
 * @openapi
 * /cart/items/{id}:
 *   delete:
 *     summary: Clear the user's cart (Admin only)
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart to clear
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Insufficient permissions (requires admin role)
 */
router.delete('/items/:id', (req: any, res, next) => CartController.clearCart(req, res, next));

export default router;


