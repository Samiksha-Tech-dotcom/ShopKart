
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../AxiosCall/axios";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosInstance.get(`/orders/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load order details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="order-success-page">
                <div className="order-success-card order-state-card">
                    <div className="order-loading-icon">🩵</div>
                    <h2>Loading your order...</h2>
                    <p>Please wait while we fetch your order details.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-success-page">
                <div className="order-success-card order-state-card">
                    <div className="order-state-icon">!</div>
                    <h2>Couldn't load your order</h2>
                    <p>{error}</p>
                    <button
                        className="order-primary-btn"
                        onClick={() => navigate("/my-orders")}
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-success-page">
                <div className="order-success-card order-state-card">
                    <h2>Order not found</h2>
                    <p>We couldn't find the requested order.</p>
                    <button
                        className="order-primary-btn"
                        onClick={() => navigate("/my-orders")}
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        );
    }

    if (order.paymentStatus !== "PAID") {
        return (
            <div className="order-success-page">
                <div className="order-success-card">
                    <div className="order-state-icon">⚠️</div>

                    <h1>Payment Incomplete</h1>

                    <p>
                        We couldn't confirm payment for this order.
                        Your order has not been placed yet.
                    </p>

                    <p>
                        Order ID: {order._id}
                    </p>

                    <button
                        className="order-primary-btn"
                        onClick={() => navigate("/my-orders")}
                    >
                        Back to My Orders
                    </button>
                </div>
            </div>
        );
    }

    const isPaid =
        String(order.paymentStatus).toLowerCase() === "paid";

    return (
        <div className="order-success-page">
            <div className="order-success-container">

                <div className="order-success-card">

                    <div className="success-checkmark">✓</div>

                    <p className="success-eyebrow">
                        THANK YOU FOR YOUR ORDER
                    </p>

                    <h1>Order Confirmed!</h1>

                    <p className="success-message">
                        Thank you for shopping with ShoppyMania.
                        Your order details are ready below.
                    </p>

                    <div className="success-status-pill">
                        <span className="success-status-dot"></span>
                        {isPaid
                            ? "Payment successful"
                            : `Payment: ${order.paymentStatus}`}
                    </div>

                    <div className="success-order-id">
                        <span>ORDER ID</span>
                        <strong>{order._id}</strong>
                    </div>

                    <div className="success-summary">
                        <div className="success-summary-row">
                            <span>Payment status</span>
                            <strong>{order.paymentStatus}</strong>
                        </div>

                        <div className="success-summary-row">
                            <span>Order status</span>
                            <strong>{order.status}</strong>
                        </div>

                        <div className="success-summary-row success-total-row">
                            <span>Order total</span>
                            <strong>
                                ₹{Number(order.totalAmount).toFixed(2)}
                            </strong>
                        </div>
                    </div>

                    <div className="success-items-section">
                        <h2>What's in your order?</h2>

                        {order.items.map((item, index) => (
                            <div
                                className="success-order-item"
                                key={item.product || index}
                            >
                                <div className="success-item-icon">
                                    🛍️
                                </div>

                                <div className="success-item-details">
                                    <h3>{item.name}</h3>
                                    <p>
                                        ₹{Number(item.price).toFixed(2)}
                                        {" "}× {item.quantity}
                                    </p>
                                </div>

                                <strong className="success-item-total">
                                    ₹
                                    {(
                                        Number(item.price) * item.quantity
                                    ).toFixed(2)}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div className="success-actions">
                        <button
                            className="order-primary-btn"
                            onClick={() => navigate("/my-orders")}
                        >
                            View My Orders →
                        </button>

                        <button
                            className="order-secondary-btn"
                            onClick={() => navigate("/home")}
                        >
                            Continue Shopping
                        </button>
                    </div>

                    <p className="success-footer-note">
                        🩵 We appreciate you choosing ShoppyMania!
                    </p>

                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;