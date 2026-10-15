
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosCall/axios";
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product, isWishlisted }) => {
  const navigate = useNavigate();

  const { cartItems, addToCart, updateCart } =
    useContext(CartContext);

  const cartItem = cartItems.find(
    (item) => item.product._id === product._id
  );

  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState(isWishlisted);
  const [error, setError] = useState("");

  useEffect(() => {
    setAdded(isWishlisted);
  }, [isWishlisted]);

  const toggleWishlist = async () => {
    try {
      setError("");
      setSaving(true);

      if (added) {
        await axiosInstance.delete(`/wishlist/${product._id}`);
        setAdded(false);
        console.log("Wishlist removed!");
      } else {
        await axiosInstance.post(`/wishlist/${product._id}`);
        setAdded(true);
        console.log("Wishlist added!");
      }
    } catch (error) {
      console.log("WISHLIST ERROR:", error.response?.data || error);

      setError(
        error.response?.data?.message ||
        "Failed to update wishlist"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h2>{product.name}</h2>

      <p>₹{product.price}</p>

      <p>Category: {product.category}</p>

      <p>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <button onClick={() => navigate(`/products/${product._id}`)}>
        View Details
      </button>

      <button
        className="wishlist-heart"
        onClick={toggleWishlist}
        disabled={saving}
      >
        {saving ? "⏳" : added ? "♥" : "♡"}
      </button>

      {cartItem ? (
        <div className="cart-controls">
          <p className="added-message">✓ Added to Cart</p>

          <button
            onClick={() =>
              updateCart(product._id, cartItem.quantity - 1)
            }
            disabled={cartItem.quantity <= 1}
          >
            −
          </button>

          <span>{cartItem.quantity}</span>

          <button
            onClick={() =>
              updateCart(product._id, cartItem.quantity + 1)
            }
            disabled={cartItem.quantity >= product.stock}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product._id)}
          disabled={product.stock <= 0}
        >
          Add to Cart
        </button>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductCard;
