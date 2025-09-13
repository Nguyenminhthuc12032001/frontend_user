import axios from "axios";

// Tạo instance axios
const api = axios.create({
    baseURL: "http://172.16.3.236:5000/api/product",
});

// Interceptor: tự động thêm token từ localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // lấy token khi user login
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
    try {
        const res = await api.get("/getAll");
        return res.data;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};

// Lấy sản phẩm theo id
export const getProductById = async (id) => {
    try {
        const res = await api.get(`/get/${id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching product with id ${id}:`, err);
        throw err;
    }
};
