// src/routes/order_routes.ts
import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();

router.get("/orders", OrderController.getOrders);
router.get("/orders/:id", OrderController.getOrder);
router.post("/orders", OrderController.createOrder);
router.put("/orders/:id", OrderController.updateOrder);
router.delete("/orders/:id", OrderController.deleteOrder);

export default router;