import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosCall/axios";
import ProductCard from "../Components/ProductCard";
import SearchBar from "../Components/SearchBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ProductList.css";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/product/search", {
        params: {
          search: search,
          category: category
        }
      });

      setProducts(response.data.pdts);
    } catch (error) {
      console.log(error.response?.data || error);
      setError("Failed to load products");
    }
    finally {
      setLoading(false);
    }
  };
  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist");

      const ids = response.data.wishlist.map((product) => product._id);

      setWishlistIds(ids);
    } catch (error) {
      console.log("Wishlist fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [search, category]);

  return (
    <div className="product-list-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>Our Products</h1>

      <div className="product-controls">

        <div className="product-search">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <select
          className="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Beauty">Beauty</option>
          <option value="Fitness">Fitness</option>
          <option value="Home">Home</option>
          <option value="Stationery">Stationery</option>
          
        </select>

      </div>

      {loading && (
        <div className="product-state">
          Loading products...
        </div>
      )}

      {error && (
        <div className="product-state">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="product-state">
          No products found
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={wishlistIds.includes(product._id)}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;