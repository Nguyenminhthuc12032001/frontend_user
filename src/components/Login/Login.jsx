import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import bgImage from "../../assets/images/Login_background.png";
import { login } from "../../api/user";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // khởi tạo navigate

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.email === "" || form.password === "") {
            setError("Please enter all required fields!");
            return;
        }

        try {
            const { token } = await login(form.email, form.password);

            // Lưu token
            localStorage.setItem("token", token);

            setError("");

            // Chuyển hướng sang trang Home
            navigate("/home"); // hoặc "/" nếu Home nằm ở root
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password!"
            );
        }
    };

    return (
        <div
            style={{
                margin: 0,
                fontFamily: "Arial, sans-serif",
                height: "100vh",
                background: `url(${bgImage}) no-repeat center center/cover`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="login-box"
                style={{
                    position: "relative",
                    width: "500px",
                    background: "#f9d77e",
                    borderRadius: "15px",
                    padding: "60px 30px 30px 30px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                }}
            >
                {/* Bone title */}
                <div
                    className="bone-title"
                    style={{
                        position: "absolute",
                        top: "-70px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "300px",
                        height: "100px",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 200"
                        width="100%"
                        height="100%"
                    >
                        <path
                            d="M50,100
               C10,40, 100,20, 120,70
               L380,70
               C400,20, 490,40, 450,100
               C490,160, 400,180, 380,130
               L120,130
               C100,180, 10,160, 50,100Z"
                            fill="white"
                            stroke="#f9d77e"
                            strokeWidth="6"
                        />
                    </svg>
                    <div
                        className="bone-text"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#6b3e26",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Login Furshield
                    </div>
                </div>

                <span
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        fontSize: "22px",
                        color: "#fff",
                    }}
                >
                    🐾
                </span>
                <span
                    style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "12px",
                        fontSize: "22px",
                        color: "#fff",
                    }}
                >
                    🐾
                </span>

                <h1
                    className="mb-1 text-center"
                    style={{ fontSize: "42px", fontWeight: "bold", color: "#6b3e26" }}
                >
                    Login
                </h1>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "2px solid white",
                                outline: "none",
                                boxShadow: "none",
                                fontSize: "16px",
                                padding: "12px",
                            }}
                            onFocus={(e) => (e.target.style.border = "2px solid #6b3e26")}
                            onBlur={(e) => (e.target.style.border = "2px solid white")}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "2px solid white",
                                outline: "none",
                                boxShadow: "none",
                                fontSize: "16px",
                                padding: "12px",
                            }}
                            onFocus={(e) => (e.target.style.border = "2px solid #6b3e26")}
                            onBlur={(e) => (e.target.style.border = "2px solid white")}
                        />
                    </div>
                    <button
                        className="btn"
                        style={{
                            background: "#6b3e26",
                            color: "#f5deb3",
                            borderRadius: "10px",
                            width: "100%",
                            padding: "12px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            transition: "0.3s",
                        }}
                    >
                        Login
                    </button>
                    <a
                        href="/register"
                        className="link-register"
                        style={{
                            display: "block",
                            marginTop: "10px",
                            textAlign: "center",
                            color: "#6b3e26",
                            textDecoration: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            transition: "0.3s",
                        }}
                    >
                        Create a new account
                    </a>
                    <a
                        href="/forgot-password"
                        className="link-register"
                        style={{
                            display: "block",
                            marginTop: "5px",
                            textAlign: "center",
                            color: "#6b3e26",
                            textDecoration: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            transition: "0.3s",
                        }}
                    >
                        Forgot your password?
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
