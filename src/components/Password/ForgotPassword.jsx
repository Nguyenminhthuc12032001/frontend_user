import { useState } from "react";
import { resetPasswordRequest } from "../../api/user";
import "../../assets/css/ForgotPassword.css";
import bgImage from "../../assets/images/forgot_password_background.png";
import { Link } from "react-router-dom"; // nếu dùng react-router

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await resetPasswordRequest(email);
            setMessage(res.msg || "Please check your email!");
        } catch (error) {
            setMessage(error.msg || "Failed to send reset request!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="forgot-password-page"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="forgot-password-container">
                <h2 className="forgot-password-title">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="forgot-password-input"
                    />
                    <button
                        type="submit"
                        className="forgot-password-button"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <p className="forgot-password-message">{message}</p>}

                {/* Button về login */}
                <Link to="/login" className="forgot-password-login-button">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
