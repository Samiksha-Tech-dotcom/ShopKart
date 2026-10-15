
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            fullName,
            phone,
            addressLine1,
            city,
            state,
            pincode
        } = shippingAddress;

        if (
            !fullName.trim() ||
            !phone.trim() ||
            !addressLine1.trim() ||
            !city.trim() ||
            !state.trim() ||
            !pincode.trim()
        ) {
            alert("Please fill in all shipping details");
            return;
        }

        if (!/^\d{10}$/.test(phone.trim())) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        if (!/^\d{6}$/.test(pincode.trim())) {
            alert("Please enter a valid 6-digit pincode");
            return;
        }

        navigate("/checkout/review", {
            state: { shippingAddress }
        });
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">

                <button
                    type="button"
                    className="checkout-back"
                    onClick={() => navigate("/cart")}
                >
                    ← Back to Cart
                </button>

                <h1>Checkout</h1>

                <p className="checkout-subtitle">
                    Just a few details before your order is ready.
                </p>

                <div className="checkout-progress">
                    <span className="active">1. Shipping</span>
                    <span>2. Review</span>
                    <span>3. Payment</span>
                </div>

                <div className="checkout-card">
                    <h2>Shipping Details</h2>

                    <p className="section-description">
                        Where should we deliver your order?
                    </p>

                    <form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="checkout-field full-width">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={shippingAddress.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkout-field">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={shippingAddress.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkout-field">
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                id="pincode"
                                name="pincode"
                                inputMode="numeric"
                                placeholder="6-digit pincode"
                                value={shippingAddress.pincode}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkout-field full-width">
                            <label htmlFor="addressLine1">Delivery Address</label>
                            <input
                                id="addressLine1"
                                name="addressLine1"
                                placeholder="House number, street, area"
                                value={shippingAddress.addressLine1}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkout-field">
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                name="city"
                                placeholder="Enter city"
                                value={shippingAddress.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkout-field">
                            <label htmlFor="state">State</label>
                            <input
                                id="state"
                                name="state"
                                placeholder="Enter state"
                                value={shippingAddress.state}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="checkout-submit"
                            type="submit"
                        >
                            Continue to Review →
                        </button>
                    </form>
                </div>

                <p className="checkout-footer-note">
                    🩵 Your delivery details will be used for this order.
                </p>

            </div>
        </div>
    );
};

export default Checkout;