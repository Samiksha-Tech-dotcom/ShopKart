# 🛍️ ShoppyMania — Full-Stack E-Commerce Platform

ShoppyMania is a full-stack e-commerce web application built using the MERN stack. It provides a seamless shopping experience with product browsing, search and filtering, wishlist and cart management, secure user authentication, online payments, and order tracking. It also includes a dedicated Baby Products module.

## ✨ Features

- **User Authentication:** User registration and login.
- **Product Browsing:** Explore products with detailed product pages.
- **Search & Filtering:** Find products by name and category.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Wishlist:** Save and manage favorite products.
- **Secure Checkout:** Integrated Razorpay payment gateway.
- **Order Management:** View orders and track payment status.
- **Baby Products Module:** Dedicated interface and inventory management for baby products.
- **Responsive UI:** A clean and user-friendly shopping interface.

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Razorpay API

## 📁 Project Structure

```text
ShoppyMania/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── ...
│   └── package.json
│
└── README.md
```

*Note: Adjust the folder names above to match your actual repository structure.*

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB database
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ShoppyMania
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure your environment variables:

```env
PORT=2026
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Add any other environment variables required by your backend.

Start the backend server using the appropriate script from `package.json`, for example:

```bash
npm run dev
```

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to your backend server.

## 💳 Payment Integration

ShoppyMania uses Razorpay for online payments. Configure valid Razorpay credentials in your backend environment before testing checkout.

Use Razorpay's test mode for development and testing.

## 🔐 Security

- Keep API keys, database credentials, and JWT secrets in environment variables.
- Never commit `.env` files or other sensitive credentials.
- Configure authentication and authorization for protected endpoints.
- Use HTTPS and appropriate production settings when deploying.

## 🚀 Future Improvements

- Password recovery through email.
- Google and Apple sign-in.
- Product reviews and ratings.
- Admin dashboard and advanced inventory management.
- Deployment with a production database and payment configuration.


