import express from "express";
import { addToCart,getCart,updateCart,removeFromCart } from "../controllers/cart.controller.js";
import isAuthenticated from "../Middlewares/authmiddleware.js";

const cartRoutes = express.Router();

cartRoutes.post("/:productId", isAuthenticated, addToCart);
cartRoutes.get("/", isAuthenticated, getCart);
cartRoutes.patch("/:productId", isAuthenticated, updateCart);
cartRoutes.delete("/:productId",isAuthenticated, removeFromCart); 

export default cartRoutes;