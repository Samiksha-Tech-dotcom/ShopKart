
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosCall/axios";
import "./MyOrders.css";

const MyOrders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get("/orders");
                setOrders(response.data.orders);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load your orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="my-orders-page">
                <div className="my-orders-state-card">
                    <div className="orders-loading-icon">🛍️</div>
                    <h2>Loading your orders...</h2>
                    <p>Just a moment while we fetch your shopping history.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-orders-page">
                <div className="my-orders-state-card">
                    <div className="orders-state-icon">😕</div>
                    <h2>Couldn't load your orders</h2>
                    <p>{error}</p>
                    <button
                        className="orders-primary-btn"
                        onClick={() => navigate("/home")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="my-orders-page">
            <div className="my-orders-container">
                <button
                    className="my-orders-back-btn"
                    onClick={() => navigate("/home")}
                >
                    ← Back to Shopping
                </button>

                <div className="my-orders-header">
                    <span className="orders-eyebrow">
                        YOUR SHOPPING HISTORY
                    </span>
                    <h1>My Orders</h1>
                    <p>All your ShoppyMania purchases, in one place.</p>
                </div>

                <div className="orders-count">
                    <span>📦</span>
                    <span>
                        {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                    </span>
                </div>

                {orders.length === 0 ? (
                    <div className="my-orders-empty">
                        <div className="empty-orders-icon">🛍️</div>
                        <h2>No orders yet!</h2>
                        <p>
                            Looks like you haven't shopped with us yet.
                            Your next favourite find is waiting for you.
                        </p>
                        <button
                            className="orders-primary-btn"
                            onClick={() => navigate("/products")}
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="my-orders-list">
                        {orders.map((order) => (
                            <div className="my-order-card" key={order._id}>
                                <div className="my-order-top">
                                    <div>
                                        <span className="order-label">
                                            ORDER ID
                                        </span>
                                        <h3 className="my-order-id">
                                            #{order._id}
                                        </h3>
                                    </div>

                                    <span
                                        className={`order-status-badge ${order.paymentStatus === "PENDING"
                                                ? "pending"
                                                : String(order.status || "")
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
                                            }`}
                                    >
                                        {order.paymentStatus === "PENDING"
                                            ? "Payment Incomplete"
                                            : order.status === "PLACED"
                                                ? "Order Placed"
                                                : order.status || "Processing"}
                                    </span>
                                </div>

                                <div className="my-order-details">
                                    <div className="my-order-detail">
                                        <span className="order-detail-label">
                                            Order Date
                                        </span>
                                        <span className="order-detail-value">
                                            {order.createdAt
                                                ? new Date(
                                                    order.createdAt
                                                ).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })
                                                : "Date unavailable"}
                                        </span>
                                    </div>

                                    <div className="my-order-detail">
                                        <span className="order-detail-label">
                                            Payment
                                        </span>
                                        <span className="order-detail-value">
                                            {order.paymentStatus || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="my-order-detail">
                                        <span className="order-detail-label">
                                            Total Amount
                                        </span>
                                        <span className="order-total">
                                            ₹{Number(order.totalAmount).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="my-order-bottom">
                                    <span className="order-thank-you">
                                        Thank you for shopping with us 💙
                                    </span>

                                    <button
                                        className="order-details-btn"
                                        onClick={() =>
                                            navigate(
                                                `/order-success/${order._id}`
                                            )
                                        }
                                    >
                                        View Order Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="my-orders-footer">
                    Made with 💙 by ShoppyMania
                </div>
            </div>
        </div>
    );
};

export default MyOrders;

