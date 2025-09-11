import React, { useState } from "react";
import { register } from "../../api/user";
import DogImg from "../../assets/images/dog_animation_register.png";
import CatImg from "../../assets/images/cat_animation_register.png";
import "../../assets/css/Register.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
    });

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");

        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.phone_number
        ) {
            setError("Please fill in all fields!");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Password and confirm password do not match!");
            return;
        }

        try {
            const res = await register({
                name: form.name,
                email: form.email,
                password_hash: form.password,
                confirmPassword: form.confirmPassword,
                phone_number: form.phone_number,
            });

            setMsg(res.msg || "Register successfully!"); // màu vàng
            setForm({ name: "", email: "", password: "", confirmPassword: "", phone_number: "" });
        } catch (err) {
            // err là object backend trả về, có thể { msg: "Unauthorized access" }
            setError(err.msg || err.message || "Something went wrong"); // màu đỏ
            console.log("Backend error:", err);
    }

    };

    return (
        <div className="register-page flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 to-pink-50">
            <div className="register-container bg-white p-6 rounded-xl shadow-md w-full max-w-4xl flex flex-col md:flex-row items-center">
                {/* Dog + Cat images */}
                <div className="w-48 md:w-1/3 text-center mb-6 md:mb-0">
                    <div className="pet-images relative w-48 h-48 mx-auto">
                        <img
                            src={DogImg}
                            alt="Dog"
                            className="dog absolute top-0 left-0 w-full h-full object-contain transition-all duration-1000"
                        />
                        <img
                            src={CatImg}
                            alt="Cat"
                            className="cat absolute top-0 left-0 w-full h-full object-contain transition-all duration-1000"
                        />
                    </div>
                </div>

                {/* Form */}
                <div className="w-full md:w-2/3 md:pl-6">
                    <h2 className="text-center text-yellow-500 text-2xl font-bold mb-6">
                        Register
                    </h2>

                    {/* Hiển thị msg thành công */}
                    {msg && (
                        <div className="bg-yellow-100 text-yellow-600 p-2 mb-4 rounded">
                            {msg}
                        </div>
                    )}

                    {/* Hiển thị lỗi */}
                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Phone Number</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded transition-colors"
                        >
                            Register
                        </button>
                        <a
                            href="/login"
                            className="w-full block text-center text-blue-500 hover:underline mt-2"
                        >
                            Login
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
