import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosCall/axios";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";



const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.get("/wishlist");

            setWishlist(response.data.wishlist);
        } catch (error) {
            console.log(error);
            setError("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };
    const removeFromWishlist = async (productId) => {
        try {
            await axiosInstance.delete(`/wishlist/${productId}`);

            setWishlist((prevWishlist) =>
                prevWishlist.filter((product) => product._id !== productId)
            );
        } catch (error) {
            console.log(error);
            setError("Failed to remove product");
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return <div>Loading wishlist...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-page">
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="empty-wishlist">
                    <h1>Your Wishlist is Empty ❤️</h1>
                    <p>Add some products you love!</p>
                </div>
            </div>
        );
    }
    return (
        <div className="wishlist-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <h1>My Wishlist</h1>

            <div className="wishlist-grid">
                {wishlist.map((product) => (
                    <div className="wishlist-card" key={product._id}>
                        <img
                            src={product.image}
                            alt={product.name}
                        />

                        <h2>{product.name}</h2>

                        <p>₹{product.price}</p>

                        <p>{product.category}</p>
                        <button
                            onClick={() => navigate(`/products/${product._id}`)}
                            className="view-details-btn"
                        >
                            View Details
                        </button>

                        <button
                            onClick={() => removeFromWishlist(product._id)}
                            className="remove-wishlist-btn"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;