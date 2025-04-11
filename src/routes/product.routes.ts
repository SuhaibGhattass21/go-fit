// src/routes/product_routes.ts
import { Router, RequestHandler } from "express";
import { ProductController } from "../controllers/product.controller"; // Adjust the import path as necessary

const router = Router();

const getProducts: RequestHandler = ProductController.getProductsByCategory;
const getProduct: RequestHandler = ProductController.getProduct;
const getCategories: RequestHandler = ProductController.getCategories;
const createProduct: RequestHandler = ProductController.createProduct;
const updateProduct: RequestHandler = ProductController.updateProduct;
const deleteProduct: RequestHandler = ProductController.deleteProduct;

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.get("/categories", getCategories);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;