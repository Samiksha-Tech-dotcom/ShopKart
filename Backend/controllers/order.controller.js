import Order from "../Model/order.model.js";
import User from "../Model/user.model.js";
import Product from "../Model/product.model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

const createPaymentOrder = async (req, res) => {
    let order;
    try {
        const user = await User.findById(req.user._id).populate("cart.product");
        if (!user || user.cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        for (const item of user.cart) {

            if (!item.product) {
                return res.status(400).json({
                    message: "Product no longer exists"
                });
            }

            if (item.quantity > item.product.stock) {
                return res.status(400).json({
                    message: `Insufficient stock for ${item.product.name}`
                });
            }
        }
        let totalAmount = 0;

        for (const item of user.cart) {
            totalAmount += item.product.price * item.quantity;
        }


        const orderItems = user.cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image
        }));

        order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress: req.body.shippingAddress,
            totalAmount: totalAmount,
            paymentStatus: "PENDING",
            status: "PENDING_PAYMENT"
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: order._id.toString()
        });
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return res.status(201).json({
            shopKartOrderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error(error);

        if (order) {
            await Order.findByIdAndDelete(order._id);
        }

        return res.status(500).json({
            message: "Failed to create payment order"
        });
    }
};

const verifyPayment = async (req, res) => {
    const {
        shopKartOrderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const order = await Order.findById(shopKartOrderId);

    console.log("VERIFY PAYMENT CALLED");
    console.log("Razorpay order ID:", razorpay_order_id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
    const body = order.razorpayOrderId + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) //meaning : Take this data and create a secure signature using my secret key.
        .update(body)   // This tells crypto://"The data I want you to sign is this body."                     //sha256 This tells Node which cryptographic hashing algorithm to use.//
        .digest("hex"); //hex means we want the result represented as a hexadecimal string.

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Invalid payment signature"
        });
    }

    order.paymentStatus = "PAID";
    order.status = "PLACED";
    order.razorpayPaymentId = razorpay_payment_id;

    await order.save();

    const user = await User.findById(req.user._id);

    user.cart = [];

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        order
    });

};


const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
};






export {
    createPaymentOrder,
    verifyPayment,
    getMyOrders,
    getOrderById
};


