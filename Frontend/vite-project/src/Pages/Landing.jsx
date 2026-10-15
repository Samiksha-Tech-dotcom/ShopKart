import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="landing-navbar">

        <div className="landing-logo">
          ShoppyMania
        </div>

        <div className="landing-nav-links">
          <a href="#about">About</a>
          <a href="#categories">Categories</a>
          <a href="#features">Why Us</a>
        </div>

        <div className="landing-auth-buttons">

          <Link to="/login" className="landing-login">
            Login
          </Link>

          <Link to="/signup" className="landing-signup">
            Create Account
          </Link>

        </div>

      </nav>


      {/* HERO SECTION */}
      <section className="landing-hero">

        <div className="landing-content">

          <p className="landing-small-text">
            WELCOME TO SHOPPYMANIA ✨
          </p>

          <h1>
            YOUR STYLE.
            <br />
            YOUR CHOICE.
          </h1>

          <p className="landing-description">
            Discover fashion, beauty, accessories and
            everything you love — all in one place.
          </p>

          <div className="landing-buttons">

            <Link to="/signup" className="landing-main-btn">
              CREATE ACCOUNT
            </Link>

            <Link to="/login" className="landing-outline-btn">
              LOGIN
            </Link>

          </div>

        </div>


        <div className="landing-image">

          <img
            src="https://res.cloudinary.com/cws1cwhf/image/upload/v1790336540/Screenshot_2026-09-25_171036.png"
            alt="Shopping"
          />

        </div>

      </section>


      {/* CATEGORIES */}
      <section className="landing-categories" id="categories">

        <p className="landing-section-label">
          EXPLORE
        </p>

        <h2>
          SOMETHING FOR EVERYONE
        </h2>

        <div className="landing-category-grid">

          <div className="landing-category-card">
            <span>👗</span>
            <h3>Fashion</h3>
            <p>Find your perfect look</p>
          </div>

          <div className="landing-category-card">
            <span>👟</span>
            <h3>Shoes</h3>
            <p>Step into something new</p>
          </div>

          <div className="landing-category-card">
            <span>💄</span>
            <h3>Beauty</h3>
            <p>Glow your own way</p>
          </div>

          <div className="landing-category-card">
            <span>👜</span>
            <h3>Accessories</h3>
            <p>Complete your style</p>
          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section className="landing-about" id="about">

        <div>
          <p className="landing-section-label">
            ABOUT SHOPPYMANIA
          </p>

          <h2>
            SHOPPING MADE
            <br />
            SIMPLE & FUN 💕
          </h2>

          <p>
            ShoppyMania brings your favourite products together
            in one beautiful and easy-to-use shopping experience.
            Discover something new every day and shop your way.
          </p>
        </div>

      </section>


      {/* FEATURES */}
      <section className="landing-features" id="features">

        <p className="landing-section-label">
          SHOP WITH CONFIDENCE
        </p>

        <h2>
          WHY SHOPPYMANIA?
        </h2>

        <div className="landing-feature-grid">

          <div>
            <span>🚚</span>
            <h3>Fast Delivery</h3>
            <p>Get your favourite products delivered quickly.</p>
          </div>

          <div>
            <span>🔒</span>
            <h3>Secure Shopping</h3>
            <p>Your shopping experience stays safe and secure.</p>
          </div>

          <div>
            <span>↩️</span>
            <h3>Easy Returns</h3>
            <p>Simple and hassle-free returns.</p>
          </div>

          <div>
            <span>💗</span>
            <h3>Products You'll Love</h3>
            <p>Discover products made for your style.</p>
          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="landing-cta">

        <h2>
          READY TO FIND YOUR NEXT FAVOURITE?
        </h2>

        <p>
          Create your ShoppyMania account and start exploring.
        </p>

        <Link to="/signup" className="landing-main-btn">
          CREATE ACCOUNT
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="landing-footer">

        <h2>ShoppyMania</h2>

        <p>
          Your style. Your choice. Your shopping destination.
        </p>

        <div className="landing-footer-links">
          <a href="#about">About</a>
          <a href="#categories">Categories</a>
          <a href="#features">Why Us</a>
          <Link to="/login">Login</Link>
          <Link to="/signup">Create Account</Link>
        </div>

        <small>
          © 2026 ShoppyMania. All rights reserved.
        </small>

      </footer>

    </div>
  );
};

export default Landing;