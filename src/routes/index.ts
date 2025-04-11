// src/routes/index.ts
import { Router } from "express";
import productRoutes from "./product.routes"; // Ensure this matches the file name (product_routes.ts)

const router = Router();

router.use("/api", productRoutes);

export default router;