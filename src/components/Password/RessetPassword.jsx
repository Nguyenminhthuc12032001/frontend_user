import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/user";

export default function ResetPassword() {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setMessage("Password confirmation does not match!");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const res = await resetPassword(userId, token, password);
            setMessage(res.msg || "Password changed successfully!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage(error.msg || "Failed to reset password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="w-full border p-2 rounded mb-3"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Reset Password"}
                </button>
            </form>
            {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </div>
    );
}
