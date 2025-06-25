// src/routes/product_routes.ts
import { Router, RequestHandler } from "express";
import { ProductController } from "../controllers/product.controller"; // Adjust the import path as necessary
import { requireRole } from "../middlewares/role";

const router = Router();

const getProducts: RequestHandler = ProductController.getProductsByCategory;
const getProduct: RequestHandler = ProductController.getProduct;
const getCategories: RequestHandler = ProductController.getCategories;
const createProduct: RequestHandler = ProductController.createProduct;
const updateProduct: RequestHandler = ProductController.updateProduct;
const deleteProduct: RequestHandler = ProductController.deleteProduct;


/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products or filter by category
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Product category
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad request
 */
router.get("/products", getProducts);
router.post("/products", requireRole('admin'), createProduct);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all product categories
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/categories", getCategories);


/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", getProduct);
router.put("/products/:id", requireRole('admin'), updateProduct);
router.delete("/products/:id", requireRole('admin'), deleteProduct);

export default router;