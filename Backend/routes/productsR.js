import express from "express";
import { createProduct, getAllProducts, getProduct,searchProduct } from "../controllers/product.controller.js";



const productRoutes = express.Router();

productRoutes.post("/create", createProduct);

productRoutes.get("/", getAllProducts);

productRoutes.get("/search", searchProduct);

productRoutes.get("/:id", getProduct);

export default productRoutes;