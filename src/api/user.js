import axios from "axios";

// Tạo instance axios
const api = axios.create({
    baseURL: "http://127.0.0.1:5001/api/user",
});

// Interceptor: tự động thêm token từ localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

/**
 * Login
 * Lưu token vào localStorage
 */
export async function login(email, password_hash) {
    try {
        const res = await api.post("/login", { email, password_hash });
        const { token } = res.data;

        if (token) {
            localStorage.setItem("token", token);
        }

        return { token, user: res.data.user };
    } catch (error) {
        console.error("❌ Login error:", error.response?.data || error.message);
        throw error.response?.data || { msg: error.message };
    }
}

/**
 * Logout
 * Xóa token khỏi localStorage
 */
export function logout() {
    localStorage.removeItem("token");
}

/**
 * Register
 */
export async function register({ name, email, password_hash, confirmPassword, phone_number }) {
    try {
        const res = await api.post("/createNew", { name, email, password_hash, confirmPassword, phone_number });
        return res.data; // { msg: "Check your email" }
    } catch (error) {
        if (error.response?.data) throw error.response.data;
        throw { msg: error.message || "Registration failed!" };
    }
}

/**
 * Gửi yêu cầu reset mật khẩu
 */
export async function resetPasswordRequest(email) {
    try {
        const res = await api.post("/resetPasswordRequest", { email });
        return res.data; // { msg: "Check your email" }
    } catch (error) {
        console.error("❌ Reset request error:", error.response?.data || error.message);
        throw error.response?.data || { msg: error.message };
    }
}

/**
 * Đổi mật khẩu mới bằng token từ email
 */
export async function resetPassword(userId, token, newPassword) {
    try {
        const res = await api.post(`/resetPassword/${userId}`, {
            token,
            password_hash: newPassword,
        });
        return res.data; // { msg: "Password changed successfully" }
    } catch (error) {
        console.error("❌ Reset password error:", error.response?.data || error.message);
        throw error.response?.data || { msg: error.message };
    }
}

/**
 * Hàm helper: lấy token từ localStorage
 */
export function getToken() {
    return localStorage.getItem("token");
}
