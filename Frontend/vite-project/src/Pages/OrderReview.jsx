
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./OrderReview.css";

const OrderReview = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems, cartSubtotal, loading } =
        useContext(CartContext);

    const shippingAddress = location.state?.shippingAddress;

    if (!shippingAddress) {
        return (
            <div className="review-message-page">
                <div className="review-message-card">
                    <h2>Shipping details not found</h2>
                    <p>Please enter your delivery address to continue.</p>
                    <button
                        className="review-primary-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Back to Checkout
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="review-message-page">
                <div className="review-message-card">
                    <h2>Loading your order...</h2>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="review-message-page">
                <div className="review-message-card">
                    <h2>Your cart is empty</h2>
                    <p>Add something you love before checking out.</p>
                    <button
                        className="review-primary-btn"
                        onClick={() => navigate("/products")}
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-review-page">
            <div className="review-container">

                <button
                    className="review-back-btn"
                    onClick={() => navigate("/cart")}
                >
                    ← Back to Cart
                </button>

                <h1>Review Your Order</h1>
                <p className="review-subtitle">
                    Almost there! Check your details before payment.
                </p>

                <div className="review-progress">
                    <span className="completed">✓ Shipping</span>
                    <span className="active">2. Review</span>
                    <span>3. Payment</span>
                </div>

                <div className="review-address-card">
                    <div className="review-section-heading">
                        <div>
                            <h2>Shipping Address</h2>
                            <p>Where should we deliver your order?</p>
                        </div>

                        <button
                            className="review-edit-btn"
                            onClick={() =>
                                navigate("/checkout", {
                                    state: { shippingAddress }
                                })
                            }
                        >
                            Edit Address
                        </button>
                    </div>

                    <div className="review-address-details">
                        <p className="review-customer-name">
                            {shippingAddress.fullName}
                        </p>
                        <p>{shippingAddress.phone}</p>
                        <p>{shippingAddress.addressLine1}</p>
                        <p>
                            {shippingAddress.city},{" "}
                            {shippingAddress.state}
                        </p>
                        <p>{shippingAddress.pincode}</p>
                    </div>
                </div>

                <div className="review-items-card">
                    <div className="review-section-heading">
                        <div>
                            <h2>Order Items</h2>
                            <p>
                                {cartItems.length} product
                                {cartItems.length !== 1 ? "s" : ""} in your order
                            </p>
                        </div>
                    </div>

                    <div className="review-items-list">
                        {cartItems.map((item) => (
                            <div
                                className="review-item"
                                key={item.product._id}
                            >
                                <img
                                    className="review-item-image"
                                    src={item.product.image}
                                    alt={item.product.name}
                                />

                                <div className="review-item-info">
                                    <h3>{item.product.name}</h3>
                                    <p>
                                        ₹{Number(item.product.price).toFixed(2)} each
                                    </p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>

                                <p className="review-item-total">
                                    ₹
                                    {(
                                        Number(item.product.price) *
                                        item.quantity
                                    ).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="review-subtotal">
                        <span>Subtotal</span>
                        <strong>
                            ₹{Number(cartSubtotal).toFixed(2)}
                        </strong>
                    </div>

                    <p className="review-delivery-note">
                        Delivery charges, if applicable, will be shown
                        before you complete payment.
                    </p>

                    <button
                        className="review-primary-btn review-payment-btn"
                        onClick={() =>
                            navigate("/checkout/payment", {
                                state: { shippingAddress }
                            })
                        }
                    >
                        Continue to Payment →
                    </button>
                </div>

                <p className="review-footer-note">
                    🩵 Thank you for shopping with ShoppyMania!
                </p>

            </div>
        </div>
    );
};

export default OrderReview;