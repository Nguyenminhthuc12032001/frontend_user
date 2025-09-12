import axios from "axios";

// Token cố định
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzNiZjFjNTJmYjIyOGI4ZTVkYWU0NSIsInJvbGUiOiJhZG1pbiIsInZlcnNpb25Ub2tlbiI6MCwiaWF0IjoxNzU3NjYyMTcyLCJleHAiOjE3NTc2NzI5NzJ9.c_qm7yWANewQDPH5kg5ldvLUf2Q6bugV2Hy7_eTJHvc";

const api = axios.create({
    baseURL: "http://172.16.3.236:5000/api/pet",
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
export const getPetById = async (id) => {
    try {
        const res = await api.get(`/get/${id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching pet with id ${id}:`, err);
        console.log("Pet data:", id);
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
        const res = await api.delete(`/delete/${id}`); // bỏ //, thêm delete
        return res.data;
    } catch (err) {
        console.error("Error deleting pet:", err.response?.data || err);
        throw err;
    }
};
