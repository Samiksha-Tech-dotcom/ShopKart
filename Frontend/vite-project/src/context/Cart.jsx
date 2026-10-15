import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        loading,
        error,
        updateCart,
        removeFromCart,
        cartSubtotal
    } = useContext(CartContext);

    if (loading) {
        return (
            <div className="cart-state">
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-state">
                <h2>{error}</h2>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-state">
                <h2>Your cart is empty 🛒</h2>
                <p>Looks like you haven't added anything yet.</p>
            </div>
        );
    }

    return (

        <div className="cart-page">

            <button
                className="back-home-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
            <h1>My Cart 🛒</h1>

            <div className="cart-items">
                {cartItems.map((item) => (
                    <div
                        className="cart-item"
                        key={item.product._id}
                    >
                        {/* Product image */}
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="cart-product-image clickable-product"
                            onClick={() => navigate(`/products/${item.product._id}`)}
                        />


                        {/* Product details */}
                        <div
                            className="cart-item-info clickable-product"
                            onClick={() => navigate(`/products/${item.product._id}`)}
                        >
                            <h2
                                className="clickable-product"
                                onClick={() => navigate(`/products/${item.product._id}`)}
                            >
                                {item.product.name}
                            </h2>

                            <p>Price: ₹{item.product.price}</p>

                            <p>
                                Item total: ₹
                                {item.product.price * item.quantity}
                            </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="cart-quantity">
                            <button
                                onClick={() =>
                                    updateCart(
                                        item.product._id,
                                        item.quantity - 1
                                    )
                                }
                                disabled={item.quantity <= 1}
                            >
                                −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateCart(
                                        item.product._id,
                                        item.quantity + 1
                                    )
                                }
                                disabled={
                                    item.quantity >= item.product.stock
                                }
                            >
                                +
                            </button>
                        </div>

                        {/* Remove item */}
                        <button
                            className="cart-remove-btn"
                            onClick={() =>
                                removeFromCart(item.product._id)
                            }
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Order summary */}
            <div className="cart-summary">
                <h2>Order Summary</h2>

                <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                </div>

                <button
                    className="checkout-btn"
                    onClick={() => navigate("/checkout")}
                    disabled={cartItems.length === 0}
                >
                    Proceed to Checkout →
                </button>
            </div>


        </div>
    );
};

export default Cart;
