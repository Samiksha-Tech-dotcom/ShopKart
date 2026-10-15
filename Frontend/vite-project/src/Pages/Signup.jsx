import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";
import axiosInstance from "../AxiosCall/axios";



const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handlechange = async (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoader(true)
    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      setLoader(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/user/signup", form)
      console.log("user Register")
      navigate("/login")

    } catch (error) {
  console.log(error.response?.data);
}

  }



  return (
    <div className="signup-page">

      {/* Background overlay */}
      <div className="background-overlay"></div>

      {/* Signup Card */}
      <div className="signup-card">

        <h1>CREATE ACCOUNT</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >

          {/* Name */}
          <div className="input-box">
            <input
              type="text"
              placeholder="John Doe"
              name="name"
              value={form.name}
              onChange={handlechange}

            />
          </div>

          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handlechange}
            />
          </div>

          {/* Phone */}
          <div className="input-box">
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
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

          {/* Confirm Password */}
          <div className="input-box password-box">
            <input

              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />


            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }

            >
              {showConfirmPassword ? "◉" : "◌"}
            </button>
          </div>

          {/* Terms */}
          <div className="terms">
            <input type="checkbox" id="terms" />

            <label htmlFor="terms">
              I agree all statements in{" "}
              <span>Terms of service</span>
            </label>
          </div>

          {/* Signup */}
          <button onClick={handlesubmit} className="signup-btn" type="submit">
            SIGN UP
          </button>

        </form>

        {/* Login */}
        <p className="login-link">
          Have already an account ?{" "}
          <Link to="/login">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;