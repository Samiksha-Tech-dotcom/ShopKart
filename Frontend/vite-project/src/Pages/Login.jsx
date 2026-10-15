import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../AxiosCall/axios";

import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()


  const handlechange = async (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setErr("")
    setLoader(true)


    try {
      await axiosInstance.post("/user/login", form)
      console.log("user Login")
      navigate("/home")


    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="login-page">

      {/* Left Side - Image */}
      <div className="login-image-section">
        <img
          src="/shopping-login.png"
          alt="Shopping illustration"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-section">

        <div className="login-card">

          <h1>WELCOME BACK</h1>

          <p className="login-subtitle">
            Login to continue shopping with us
          </p>

          <form onSubmit={handlesubmit}>

            {/* Email */}
            <div className="input-box">
              <input
                type="email"
                name='email'
                placeholder="Your Email"
                value={form.email}
                onChange={handlechange}
              />
            </div>

            {/* Password */}
            <div className="input-box password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handlechange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}

              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="login-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>


            </div>

            {/* Login Button */}
            <button
              className="login-btn"
              type="submit"
              onClick={handlesubmit}

            >
              LOGIN
            </button>

          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>



          {/* Signup */}
          <p className="signup-link">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;