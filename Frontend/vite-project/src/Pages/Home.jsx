
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";
import { CartContext } from "../context/CartContext";
import axiosInstance from "../AxiosCall/axios";

const Home = () => {
  const navigate = useNavigate();

  const { cartCount } = useContext(CartContext);

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axiosInstance.get("/product");

        // Taking the first 4 products from your actual database
        setTrendingProducts(response.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrendingProducts();
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist");

        const ids = response.data.wishlist.map((product) => product._id);

        setWishlistIds(ids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);
  const toggleWishlist = async (productId) => {
    try {
      if (wishlistIds.includes(productId)) {
        await axiosInstance.delete(`/wishlist/${productId}`);

        setWishlistIds((prev) =>
          prev.filter((id) => id !== productId)
        );
      } else {
        await axiosInstance.post(`/wishlist/${productId}`);

        setWishlistIds((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          ShoppyMania
        </div>


        <div className="nav-links">
          <Link to="/home">Home</Link>
          <a href="#categories">Categories</a>
          <Link to="/products">New Arrivals</Link>
          <Link to="/my-orders">My Orders</Link>

        </div>


        <div className="nav-actions">
          <button onClick={() => navigate("/products")}>🔍</button>
          <button onClick={() => navigate("/wishlist")}>♡</button>
          <button
            className="cart-nav-btn"
            onClick={() => navigate("/cart")}
            title="View Cart"
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          <button
            onClick={() => navigate("/profile")}
            title="My Profile"
          >
            👤
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </nav>


      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-text">
            NEW COLLECTION
          </p>

          <h1>
            Find Your
            <br />
            Perfect Style
          </h1>

          <p className="hero-description">
            Discover beautiful products made
            <br />
            just for you.
          </p>

          <button
            className="shop-now-btn"
            onClick={() => navigate("/products")}
          >
            SHOP NOW →
          </button>

        </div>

        <div className="hero-image">

          <div className="hero-circle">
            <img
              src="https://res.cloudinary.com/cws1cwhf/image/upload/v1790336540/Screenshot_2026-09-25_171036.png"
              alt="Shopping"
            />
          </div>
        </div>

      </section>


      {/* CATEGORIES */}
      <section id="categories" className="categories-section">

        <h2>Shop By Category</h2>

        <div className="category-container">
          <div
            className="category-card"
            onClick={() => navigate("/products?category=Electronics")}
          >
            <div className="category-icon">⚡</div>
            <p>Electronics</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products?category=Clothing")}
          >
            <div className="category-icon">👗</div>
            <p>Clothing</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products?category=Shoes")}
          >
            <div className="category-icon">👟</div>
            <p>Shoes</p>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/products?category=Beauty")}
          >
            <div className="category-icon">💄</div>
            <p>Beauty</p>
          </div>

        </div>

      </section>


      {/* TRENDING PRODUCTS */}
      <section id="products" className="products-section">
        <div className="trending-grid">
          {trendingProducts.map((product) => (
            <div
              className="trending-card"
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <div className="trending-image">

                <button
                  className="trending-heart"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                >
                  {wishlistIds.includes(product._id) ? "♥" : "♡"}
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Home;