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

            setMsg(res.msg || "Register successfully!");
            setForm({ name: "", email: "", password: "", confirmPassword: "", phone_number: "" });
        } catch (err) {
            setError(err.msg || err.message || "Something went wrong");
            console.log("Backend error:", err);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Dog + Cat images */}
                <div className="pet-images">
                    <img src={DogImg} alt="Dog" className="dog" />
                    <img src={CatImg} alt="Cat" className="cat" />
                </div>

                {/* Form */}
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">Register</h2>

                    {msg && <div className="bg-yellow-100 text-yellow-600 p-2 mb-4 rounded">{msg}</div>}
                    {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" required />
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />

                    <button type="submit">Register</button>
                    <a href="/login" className="text-center mt-2 text-blue-500 block">Login</a>
                </form>
            </div>
        </div>
    );
};

export default Register;
