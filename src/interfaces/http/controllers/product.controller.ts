import { NextFunction, Request, Response } from "express";
import { ProductService } from "../../../domain/services/product.service";
import { ProductCategory } from "../../../domain/enums/categories";

export class ProductController {

    static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description, price, category, stock, imageUrl } = req.body;

            // Validate required fields
            if (!name || !description || !price || !category || !stock) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields: name, description, price, category, stock",
                });
            }

            // Creation of the product
            const product = await ProductService.createProduct(
                name,
                description,
                price,
                category,
                stock,
                imageUrl
            );
            res.status(201).json({
                success: true,
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: (error as Error).message,
            });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const updates = req.body;

            const updatedProduct = await ProductService.updateProduct(productId, updates);
            res.status(200).json({
                success: true,
                data: updatedProduct,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(errorMessage === "Product not found" ? 404 : 500).json({
                success: false,
                message: (error as Error).message,
            });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            await ProductService.deleteProduct(productId);
            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(errorMessage === "Product not found" ? 404 : 500).json({
                success: false,
                message: errorMessage,
            });
        }
    }

    static async getProductsByCategory(req: Request, res: Response) {
        try {
            const category = req.query.category as ProductCategory | undefined;
            const products = await ProductService.getProductsByCategory(category);
            res.status(200).json({
                success: true,
                data: products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: (error as Error).message,
            });
        }
    }

    static async getProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const product = await ProductService.getProductById(productId);
            res.status(200).json({
                success: true,
                data: product,
            });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(errorMessage === "Product not found" ? 404 : 500).json({
                success: false,
                message: errorMessage,
            });
        }
    }

    static async getCategories(req: Request, res: Response) {
        try {
            const categories = ProductService.getCategories();
            res.status(200).json({
                success: true,
                data: categories,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: (error as Error).message,
            });
        }
    }
}


