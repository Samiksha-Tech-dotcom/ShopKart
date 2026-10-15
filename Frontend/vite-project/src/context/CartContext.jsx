import { createContext, useState, useEffect } from "react";
import axiosInstance from "../AxiosCall/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosInstance.get("/cart");

            setCartItems(response.data.cart);

        } catch (error) {
            console.log(error);
            setError("Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId) => {
        try {
            setError(null);

            await axiosInstance.post(`/cart/${productId}`);

            await fetchCart();

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to add to cart");
        }
    };
    const updateCart = async (productId, quantity) => {
        try {
            setError(null);

            await axiosInstance.patch(`/cart/${productId}`, {
                quantity: quantity
            });

            await fetchCart();

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to update cart");
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setError(null);

            await axiosInstance.delete(`/cart/${productId}`);

            await fetchCart();

        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message || "Failed to remove from cart"
            );
        }
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartSubtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    useEffect(() => {
        fetchCart();
    }, []);


    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            error,
            fetchCart,
            addToCart, updateCart,
            removeFromCart,
            cartCount,
            cartSubtotal
        }}>
            {children}
        </CartContext.Provider>
    );
};