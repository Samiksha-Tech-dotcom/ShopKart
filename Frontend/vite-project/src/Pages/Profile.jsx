
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosCall/axios";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("/user/me");
                setUser(response.data.user || response.data);
            } catch (err) {
                console.error("Profile error:", err);
                setError(
                    err.response?.data?.message ||
                    "Couldn't load your profile. Please log in again if needed."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className="profile-page">Loading profile...</div>;
    }

    if (error) {
        return (
            <div className="profile-page">
                <h2>My Profile 👤</h2>
                <p>{error}</p>
                <button onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-avatar">👤</div>
                <h1>My Profile</h1>
                <p className="profile-subtitle">
                    Your ShoppyMania account
                </p>

                <div className="profile-detail">
                    <span>Name</span>
                    <strong>{user.name || "Not available"}</strong>
                </div>

                <div className="profile-detail">
                    <span>Email</span>
                    <strong>{user.email || "Not available"}</strong>
                </div>

                <div className="profile-detail">
                    <span>Phone</span>
                    <strong>{user.phone || "Not available"}</strong>
                </div>

                <button
                    className="profile-home-btn"
                    onClick={() => navigate("/home")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;
