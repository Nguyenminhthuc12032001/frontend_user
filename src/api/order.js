import axios from "axios";

// Tạo instance axios
export const api = axios.create({
    baseURL: "http://127.0.0.1:5001/api/order",
});

// Interceptor tự động thêm token từ localStorage
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

/**
 * Get the current cart for a user
 */
export const getCurrentCartOrderByUser = async (user_id) => {
    try {
        const res = await api.get(`/getCurrentCart/${user_id}`);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch cart:", error);
        throw error;
    }
};

/**
 * Add items to cart
 */
export const addItemsToCart = async (product_id, quantity) => {
    try {
        const res = await api.put("/addItems", { product_id, quantity });
        return res.data;
    } catch (error) {
        console.error("Failed to add item to cart:", error);
        throw error;
    }
};

/**
 * Update an existing order
 */
export const updateOrder = async (orderId, orderData) => {
    try {
        const res = await api.put(`/updateOrder/${orderId}`, orderData);
        return res.data;
    } catch (error) {
        console.error("Failed to update order:", error);
        throw error;
    }
};

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
    try {
        const res = await api.post("/createOrder", orderData);
        return res.data;
    } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
    }
};

/**
 * Add images to an order
 */
export const addImagesToOrder = async (orderId, images) => {
    try {
        const res = await api.put(`/addImages/${orderId}`, { images });
        return res.data;
    } catch (error) {
        console.error("Failed to add images to order:", error);
        throw error;
    }
};

/**
 * Get total items in cart
 */
export const getTotalItems = async () => {
    try {
        const res = await api.get(`/totalItems`);
        return res.data.total_items;
    } catch (error) {
        console.error("Failed to fetch total items:", error);
        throw error;
    }
};
