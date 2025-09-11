import axios from "axios";

// Token cố định
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzEzZjIzNjFkMTFhYmJjOTdlMDJhOSIsInJvbGUiOiJhZG1pbiIsInZlcnNpb25Ub2tlbiI6MSwiaWF0IjoxNzU3NTgxNTk3LCJleHAiOjE3NTc1OTIzOTd9.0q6y5Hgt9XLWvee_0xOUMoXmuanL9Fd_OnS8QSOM7Ak";

const api = axios.create({
    baseURL: "http://172.16.0.43:5000/api/pet",
    headers: { Authorization: `Bearer ${TOKEN}` },
});

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
        const res = await api.put(`/${id}`, petData);
        return res.data;
    } catch (err) {
        console.error("Error updating pet:", err);
        throw err;
    }
};

// Xóa thú cưng
export const deletePet = async (id) => {
    try {
        const res = await api.delete(`/${id}`);
        return res.data;
    } catch (err) {
        console.error("Error deleting pet:", err);
        throw err;
    }
};
