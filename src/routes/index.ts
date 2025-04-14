// src/routes/index.ts
import { Router } from "express";
import productRoutes from "./product.routes"; 
import userRoutes from "./user.routes"; 

const router = Router();

router.use("/api", productRoutes);
router.use("/api", userRoutes);

export default router;