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
export async function resetPasswordRequest(email) {
    try {
        const res = await api.post("/resetPasswordRequest", { email });
        return res.data; // { msg: "Check your email" }
    } catch (error) {
        console.error("❌ Reset request error:", error.response?.data || error.message);
        throw error.response?.data || { msg: error.message };
    }
}

// Đổi mật khẩu mới bằng token (link trong mail)
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