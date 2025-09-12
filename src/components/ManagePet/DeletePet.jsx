import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePet } from "../../api/managepet";

const DeletePet = ({ petId }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            try {
                await deletePet(petId);
                alert("Pet deleted successfully!");
                navigate("/pet-dashboard");
            } catch (error) {
                console.error(error);
                alert("Failed to delete pet");
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
            Delete
        </button>
    );
};

export default DeletePet;
