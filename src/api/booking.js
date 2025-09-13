import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/appointment'; // Your backend API URL

// Create an Axios instance for appointment-related requests
const appointmentApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // assuming you store the JWT token in localStorage
    },
});

// Create a new appointment
export const createAppointment = async (appointmentData) => {
    try {
        const response = await appointmentApi.post('/createNew', appointmentData);
        return response.data; // return response data if needed
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

// Get all appointments
export const getAllAppointments = async () => {
    try {
        const response = await appointmentApi.get('/getAll');
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

// Get a specific appointment by ID
export const getAppointmentById = async (id) => {
    try {
        const response = await appointmentApi.get(`/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        throw error;
    }
};

// Update an appointment
export const updateAppointment = async (id, updateData) => {
    try {
        const response = await appointmentApi.put(`/update/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

// Delete an appointment
export const deleteAppointment = async (id) => {
    try {
        const response = await appointmentApi.delete(`/remove/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

// Search appointments based on query parameters
export const searchAppointments = async (queryParams) => {
    try {
        const response = await appointmentApi.get('/search', { params: queryParams });
        return response.data;
    } catch (error) {
        console.error('Error searching appointments:', error);
        throw error;
    }
};

// Mark appointment as completed
export const completeAppointment = async (id) => {
    try {
        const response = await appointmentApi.post(`/setcompleted/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error completing appointment:', error);
        throw error;
    }
};

export default {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    searchAppointments,
    completeAppointment
};
