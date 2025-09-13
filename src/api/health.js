import axios from "axios";

// Tạo instance axios cho health
export const healthApi = axios.create({
    baseURL: "http://127.0.0.1:5001/api/health", // Cập nhật URL của backend nếu cần
});

// Interceptor tự động gắn token vào header Authorization
healthApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
        }
        return config;
    },
    (error) => Promise.reject(error) // Nếu có lỗi thì trả về
);

/**
 * Tạo mới health record
 * @param {Object} recordData - Dữ liệu sức khỏe của thú cưng
 * @returns {Object} - Dữ liệu bản ghi vừa tạo
 */
export const createHealthRecord = async (recordData) => {
    try {
        const res = await healthApi.post("/create", recordData);
        return res.data;  // Trả về dữ liệu trả về từ server
    } catch (error) {
        console.error("Failed to create health record:", error);
        throw error;  // Nếu có lỗi, ném lỗi lên
    }
};

/**
 * Lấy tất cả health records của user
 * @returns {Array} - Danh sách các health records của user
 */
export const getAllHealthRecords = async () => {
    try {
        const res = await healthApi.get("/getAll");
        return res.data.records;  // Trả về danh sách bản ghi
    } catch (error) {
        console.error("Failed to fetch health records:", error);
        throw error;  // Nếu có lỗi, ném lỗi lên
    }
};

/**
 * Lấy health record theo pet_id
 * @param {String} petId - ID của pet cần lấy thông tin sức khỏe
 * @returns {Array} - Danh sách health records của pet
 */
export const getHealthRecordByPet = async (petId) => {
    try {
        const res = await healthApi.get(`/getByPet/${petId}`);
        return res.data.records;  // Trả về danh sách bản ghi sức khỏe của pet
    } catch (error) {
        console.error("Failed to fetch health record by pet:", error);
        throw error;  // Nếu có lỗi, ném lỗi lên
    }
};

/**
 * Cập nhật health record
 * @param {String} recordId - ID của health record cần cập nhật
 * @param {Object} updateData - Dữ liệu cần cập nhật
 * @returns {Object} - Dữ liệu bản ghi đã cập nhật
 */
export const updateHealthRecord = async (recordId, updateData) => {
    try {
        const res = await healthApi.put(`/update/${recordId}`, updateData);
        return res.data;  // Trả về dữ liệu bản ghi đã cập nhật
    } catch (error) {
        console.error("Failed to update health record:", error);
        throw error;  // Nếu có lỗi, ném lỗi lên
    }
};

/**
 * Xóa health record
 * @param {String} recordId - ID của health record cần xóa
 * @returns {Object} - Dữ liệu phản hồi từ server sau khi xóa
 */
export const deleteHealthRecord = async (recordId) => {
    try {
        const res = await healthApi.delete(`/remove/${recordId}`);
        return res.data;  // Trả về dữ liệu phản hồi sau khi xóa
    } catch (error) {
        console.error("Failed to delete health record:", error);
        throw error;  // Nếu có lỗi, ném lỗi lên
    }
};
