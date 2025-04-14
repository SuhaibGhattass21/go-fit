// src/routes/index.ts
import { Router } from "express";
import productRoutes from "./product.routes"; 
import userRoutes from "./user.routes"; 
import orderRoutes from "./order.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", productRoutes);
router.use("/api", orderRoutes);

export default router;

