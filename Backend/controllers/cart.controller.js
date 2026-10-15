import User from "../Model/user.model.js";
import Product from "../Model/product.model.js";



export const addToCart = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const existingItem = req.user.cart.find(
            item => item.product.toString() === product._id.toString()
        );
        if (existingItem) {
            if (existingItem.quantity + 1 > product.stock) { //product exists then we increase the count but untill it's less than the stock
                return res.status(400).json({
                    message: "Insufficient stock"
                });
            }
            existingItem.quantity += 1;
        }
        else {
            req.user.cart.push({
                product: product._id,
                quantity: 1
            });
        }

        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: req.user.cart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("cart.product");

        return res.status(200).json({
            success: true,
            cart: user.cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
}; 

export const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;

        // Check quantity
        if (typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({
                message: "Invalid quantity"
            });
        }

        // Find product
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        // Find item in user's cart
        const cartItem = req.user.cart.find(
            item => item.product.toString() === product._id.toString()
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not in cart"
            });
        }

        // Update quantity
        cartItem.quantity = quantity;

        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: req.user.cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const cartItem = req.user.cart.find(
            item => item.product.toString() === product._id.toString()
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not in cart"
            });
        }

        req.user.cart = req.user.cart.filter(
            item => item.product.toString() !== product._id.toString()
        );

        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: req.user.cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};