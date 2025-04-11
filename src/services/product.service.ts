import { Product } from "../models/product.model"; 
import { ProductCategory } from "../types/categories";
import { IProduct } from "../interfaces/IProduct";

export class ProductService {
    // Creating Product
    static async createProduct(
        name: string,
        description: string,
        price: number,
        category: ProductCategory,
        stock: number,
        imageUrl?: string
    ) {
        try {
            const product = new Product({
                name,
                description,
                price,
                category,
                stock,
                imageUrl,
            });
            await product.save();
            return product;
        } catch (error) {
            throw new Error(`Error creating product: ${(error as Error).message}`);
        }
    }

    // Update an existing product
    static async updateProduct(
        productId: string,
        updates: Partial<{
            name: string;
            description: string;
            price: number;
            category: ProductCategory;
            stock: number;
            imageUrl: string;
        }>
    ): Promise<IProduct | null> {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }

            Object.assign(product, updates);
            await product.save();
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${(error as Error).message}`);
        }
    }

    // Delete a product by its ID
    static async deleteProduct(productId: string): Promise<void> {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error("Product not found");
            }
        } catch (error) {
            throw new Error(`Error deleting product: ${(error as Error).message}`);
        }
    }

    // Get a product by its ID
    static async getProductById(productId: string): Promise<IProduct | null> {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
            } catch (error) {
                throw new Error(`Error fetching product: ${(error as Error).message}`);
        }
    }

    // Displaying Products by Category
    static async getProductsByCategory(category?: ProductCategory) {
        try {
            if (category) {
                const products = await Product.find({ category });
                return products;
            }
        } catch (error) {
            throw new Error(`Category not Found: ${(error as Error).message}`);
        }
    }

    // Displaying All Categories
    static getCategories(): string[] {
        return Object.values(ProductCategory);
    }
}


