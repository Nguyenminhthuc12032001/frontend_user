import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetList from "../../../components/ManagePet/PetList.jsx";
import { getAllPets } from "../../../api/managepet";

const PetDashboard = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Hàm load thú cưng
    const loadPets = async () => {
        try {
            const data = await getAllPets();
            console.log("API trả về:", data);

            if (data && Array.isArray(data.pets)) {
                setPets(data.pets);
            } else if (Array.isArray(data)) {
                setPets(data);
            } else {
                setPets([]);
            }
        } catch (err) {
            console.error("Error fetching pets:", err);
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Pet Dashboard</h1>
                <button
                    onClick={() => navigate("/pet-dashboard/create")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Add New Pet
                </button>
            </div>

            {/* Danh sách thú cưng */}
            {loading ? (
                <p className="text-center">Loading pets...</p>
            ) : (
                <PetList pets={pets} />
            )}
        </div>
    );
};

export default PetDashboard;
