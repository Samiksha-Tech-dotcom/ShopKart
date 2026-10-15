
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../AxiosCall/axios";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistError, setWishlistError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCart, cartItems, updateCart } =
    useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItem = cartItems.find(
    (item) => item.product?._id === id
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        // Corrected endpoint: products, not product
       const response = await axiosInstance.get(`/product/${id}`);

        setProduct(response.data);

        // Wishlist failure should not break product details
        try {
          const wishlistResponse = await axiosInstance.get("/wishlist");

          const wishlistIds = (
            wishlistResponse.data.wishlist || []
          ).map((item) => item._id);

          setIsWishlisted(wishlistIds.includes(response.data._id));
        } catch (wishlistError) {
          console.log("Wishlist loading error:", wishlistError);
        }
      } catch (error) {
        console.log(
          "PRODUCT LOADING ERROR:",
          error.response?.data || error.message
        );
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setCartMessage("");

    try {
      await addToCart(product._id);
      setCartMessage("✓ Added to Cart");
    } catch (error) {
      console.log("Cart error:", error);
      setCartMessage("Failed to add to cart");
    }
  };

  const toggleWishlist = async () => {
    try {
      setWishlistError("");

      if (isWishlisted) {
        await axiosInstance.delete(`/wishlist/${product._id}`);
        setIsWishlisted(false);
      } else {
        await axiosInstance.post(`/wishlist/${product._id}`);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.log("Wishlist error:", error);
      setWishlistError(
        error.response?.data?.message || "Failed to update wishlist"
      );
    }
  };

  if (loading) {
    return <div className="product-state">Loading product...</div>;
  }

  if (error) {
    return <div className="product-state">{error}</div>;
  }

  if (!product) {
    return <div className="product-state">Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-details-card">
        <img
          className="product-details-image"
          src={product.image}
          alt={product.name}
        />

        <div className="product-details-info">
          <h1>{product.name}</h1>

          <p className="product-description">
            {product.description}
          </p>

          <p className="product-price">₹{product.price}</p>

          <p className="product-category">
            Category: {product.category}
          </p>

          <p className="product-stock">
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

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
              className="add-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          )}

          {cartMessage && <p>{cartMessage}</p>}

          <button
            className="add-wishlist-btn"
            onClick={toggleWishlist}
          >
            {isWishlisted
              ? "♥ Added to Wishlist"
              : "♡ Add to Wishlist"}
          </button>

          {wishlistError && <p>{wishlistError}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
