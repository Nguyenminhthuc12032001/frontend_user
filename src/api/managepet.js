import axios from "axios";

// Tạo instance axios
const api = axios.create({
    baseURL: "http://172.16.3.236:5000/api/pet",
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

// Lấy tất cả thú cưng
export const getAllPets = async () => {
    try {
        const res = await api.get("/getAll");
        return res.data;
    } catch (err) {
        console.error("Error fetching pets:", err);
        throw err;
    }
};

// Lấy thú cưng theo id
export const getPetById = async (id) => {
    try {
        const res = await api.get(`/get/${id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching pet with id ${id}:`, err);
        throw err;
    }
};

// Thêm thú cưng mới
export const createPet = async (petData) => {
    try {
        const res = await api.post("/createNew", petData);
        return res.data;
    } catch (err) {
        console.error("Error creating pet:", err);
        throw err;
    }
};

// Cập nhật thú cưng
export const updatePet = async (id, petData) => {
    try {
        const res = await api.put(`/update/${id}`, petData);
        return res.data;
    } catch (err) {
        console.error("Error updating pet:", err);
        throw err;
    }
};

// Xóa thú cưng
export const deletePet = async (id) => {
    try {
        const res = await api.delete(`/delete/${id}`);
        return res.data;
    } catch (err) {
        console.error("Error deleting pet:", err.response?.data || err);
        throw err;
    }
};
