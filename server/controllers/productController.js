import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Controller function for adding product = /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        console.log(productData);
        await productModel.create({ ...productData, image: imagesUrl });
        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller function for product list = /api/product/list
export const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller function for getting a product details = /api/product/single
export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller function for updating product = /api/product/:id (PUT)
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Nếu có productData từ form-data
        if (updates.productData) {
            const parsedData = JSON.parse(updates.productData);
            Object.assign(updates, parsedData);
            delete updates.productData;
        }

        // Xử lý sizes nếu là string
        if (updates.sizes && typeof updates.sizes === 'string') {
            updates.sizes = JSON.parse(updates.sizes);
        }

        const product = await productModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Product updated successfully",
            product 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller function for deleting product = /api/product/:id (DELETE)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Product deleted successfully" 
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller function for changing the product stock = /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { productId, inStock } = req.body;
        await productModel.findByIdAndUpdate(productId, { inStock });
        res.json({ success: true, message: "Stock Updated" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};