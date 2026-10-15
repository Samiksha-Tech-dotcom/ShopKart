import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./context/Cart";
import Products from "./Pages/ProductList";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ProductDetails from "./Pages/ProductDetails";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import OrderReview from "./Pages/OrderReview";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrders";






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/checkout/review" element={<OrderReview />} />

        <Route path="/checkout/payment" element={<Payment />} />
        <Route
          path="/order-success/:id"
          element={<OrderSuccess />}
        />
        <Route path="/my-orders" element={<MyOrders />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;