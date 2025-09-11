import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.3.236:5000/api/user",
});


export async function login(email, password_hash) {
    try {
        const res = await api.post("/login", {
            email,
            password_hash
        });

        // Ví dụ backend trả về { token: "...", user: {...} }
        const { token } = res.data;

        // Lưu token vào localStorage để dùng cho các request sau
        if (token) {
            localStorage.setItem("token", token);
        }

        return { token };
    } catch (error) {
        console.error("❌ Login error:", error.response?.data || error.message);
        throw error;
    }

}
export async function register({ name, email, password_hash, confirmPassword, phone_number }) {
    try {
        const res = await api.post("/createNew", { name, email, password_hash, confirmPassword, phone_number });
        return res.data; // backend trả về { msg: "Check your email" }
    } catch (error) {
        if (error.response && error.response.data) {
            // throw object backend trả về
            throw error.response.data;
        } else {
            throw { msg: error.message || "Registration failed!" };
        }
    }
}