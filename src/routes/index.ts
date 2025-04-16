import { Router } from "express";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";
import authRoutes from "./auth.routes";
import cartRoutes from "./cart.routes";

const router = Router();

router.use("/", authRoutes);
router.use("/", userRoutes);
router.use("/", productRoutes);
router.use("/", orderRoutes);
router.use("/", cartRoutes);


export default router;

