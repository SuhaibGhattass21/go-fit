import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { requireRole } from "../middlewares/role";

const router = Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders or filter by userId
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID to filter orders
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Bad request
 */

router.get("/orders", requireRole('user'), OrderController.getOrders);
router.post("/orders", requireRole('user'), OrderController.createOrder);


/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 *   delete:
 *     summary: Delete order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.get("/orders/:id", requireRole('user'), OrderController.getOrder);
router.put("/orders/:id", requireRole('user'), OrderController.updateOrder);
router.delete("/orders/:id", requireRole('admin'), OrderController.deleteOrder);
router.get('/all', requireRole('admin'), OrderController.getAllOrders);
router.post('/:id/cancel', requireRole('user'), OrderController.cancelOrder);

export default router;