import axios from "axios";

// Token cố định
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzEzZjIzNjFkMTFhYmJjOTdlMDJhOSIsInJvbGUiOiJhZG1pbiIsInZlcnNpb25Ub2tlbiI6MSwiaWF0IjoxNzU3NjQ4ODc2LCJleHAiOjE3NTc2NTk2NzZ9.yF4nRH8xuf-3k4FunGeofa8Z8ul5ELWdrOwkvk6OogM";

const api = axios.create({
    baseURL: "http://172.16.3.236:5000/api/product",
    headers: { Authorization: `Bearer ${TOKEN}` },
});

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
    try {
        const res = await api.get("/");
        return res.data;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};

// Lấy sản phẩm theo id
export const getProductById = async (id) => {
    try {
        const res = await api.get(`/${id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching product with id ${id}:`, err);
        throw err;
    }
};
