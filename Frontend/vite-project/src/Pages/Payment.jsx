
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axiosInstance from "../AxiosCall/axios";
import { CartContext } from "../context/CartContext";
import "./Payment.css";

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { shippingAddress } = location.state || {};
    const { fetchCart } = useContext(CartContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {
        if (!shippingAddress) {
            navigate("/checkout");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const isScriptLoaded = await loadRazorpay();

            if (!isScriptLoaded) {
                setError("Razorpay failed to load. Please try again.");
                return;
            }

            const response = await axiosInstance.post(
                "/orders/create-payment-order",
                { shippingAddress }
            );

            const options = {
                key: response.data.key,
                amount: response.data.amount,
                currency: response.data.currency,
                name: "ShoppyMania",
                description: "Shopping Payment",
                order_id: response.data.razorpayOrderId,

                handler: async function (paymentResponse) {
                    try {
                        setLoading(true);
                        setError("");

                        const verificationResponse = await axiosInstance.post(
                            "/orders/verify-payment",
                            {
                                shopKartOrderId: response.data.shopKartOrderId,
                                razorpay_order_id:
                                    paymentResponse.razorpay_order_id,
                                razorpay_payment_id:
                                    paymentResponse.razorpay_payment_id,
                                razorpay_signature:
                                    paymentResponse.razorpay_signature
                            }
                        );

                        if (verificationResponse.data.success) {
                            await fetchCart();

                            navigate(
                                `/order-success/${response.data.shopKartOrderId}`,
                                { replace: true }
                            );
                        }
                    } catch (error) {
                        console.error(error);

                        setError(
                            error.response?.data?.message ||
                            "Payment verification failed. Please contact support before retrying."
                        );
                    } finally {
                        setLoading(false);
                    }
                },

                modal: {
                    ondismiss: function () {
                        setError("Payment was cancelled.");
                    }
                },

                theme: {
                    color: "#87CEEB"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to start payment. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">

                <button
                    className="payment-back-btn"
                    onClick={() =>
                        navigate("/checkout/review", {
                            state: { shippingAddress }
                        })
                    }
                    disabled={loading}
                >
                    ← Back to Review
                </button>

                <h1>Secure Payment</h1>
                <p className="payment-subtitle">
                    One final step! Complete your payment to place your order.
                </p>

                <div className="payment-progress">
                    <span className="completed">✓ Shipping</span>
                    <span className="completed">✓ Review</span>
                    <span className="active">3. Payment</span>
                </div>

                <div className="payment-card">
                    <div className="payment-icon">🩵</div>

                    <h2>You're almost there!</h2>

                    <p className="payment-description">
                        Your shipping details are ready. Continue to
                        Razorpay's secure checkout to pay for your order.
                    </p>

                    {error && (
                        <div className="payment-error" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="payment-security-note">
                        <span>🔒</span>
                        <div>
                            <strong>Secure checkout</strong>
                            <p>
                                Your payment is processed through Razorpay.
                                ShoppyMania does not store your card details.
                            </p>
                        </div>
                    </div>

                    <button
                        className="payment-primary-btn"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading
                            ? "Preparing payment..."
                            : "Pay with Razorpay →"}
                    </button>

                    <p className="payment-footer-note">
                        Please don't refresh or close the page while payment
                        is being processed.
                    </p>
                </div>

                <p className="payment-brand-note">
                    ShoppyMania · A smoother way to shop
                </p>

            </div>
        </div>
    );
};

export default Payment;