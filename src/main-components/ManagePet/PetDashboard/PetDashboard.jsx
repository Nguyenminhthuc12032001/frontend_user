// PetDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetList from "../../../components/ManagePet/PetList.jsx";
import { getAllPets, deletePet } from "../../../api/managepet";

const PetDashboard = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const navigate = useNavigate();

    const firstPetBreed = pets[0]?.breed || "dog";

    useEffect(() => {
        let index = 0;
        const texts = ["What your pet name?", `It’s a ${firstPetBreed}`, "How old your pet"];
        let currentText = 0;
        let adding = true;

        const typeInterval = setInterval(() => {
            if (adding) {
                setPlaceholder(texts[currentText].slice(0, index + 1));
                index++;
                if (index >= texts[currentText].length) adding = false;
            } else {
                setPlaceholder(texts[currentText].slice(0, index - 1));
                index--;
                if (index <= 0) {
                    adding = true;
                    currentText = (currentText + 1) % texts.length;
                }
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, [pets]);

    const loadPets = async () => {
        try {
            const data = await getAllPets();
            let petData = [];
            if (data && Array.isArray(data.pets)) {
                petData = data.pets;
            } else if (Array.isArray(data)) {
                petData = data;
            }
            setPets(petData);
            setFilteredPets(petData);
        } catch (err) {
            console.error("Error fetching pets:", err);
            setPets([]);
            setFilteredPets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPets();
    }, []);

    useEffect(() => {
        if (!search) setFilteredPets(pets);
        else {
            const lowerSearch = search.toLowerCase();
            setFilteredPets(
                pets.filter(
                    (pet) =>
                        pet.name?.toLowerCase().includes(lowerSearch) ||
                        pet.age?.toString().includes(lowerSearch) ||
                        pet.breed?.toLowerCase().includes(lowerSearch)
                )
            );
        }
    }, [search, pets]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            try {
                await deletePet(id);
                alert("Pet deleted successfully!");
                setPets((prev) => prev.filter((p) => p._id !== id));
                setFilteredPets((prev) => prev.filter((p) => p._id !== id));
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete pet");
            }
        }
    };

    return (
        <div className="p-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-center md:text-left mb-4" style={{ color: "#8B4513" }}>
                Pet List
            </h1>

            {/* Search + Add New */}
            <div className="flex justify-end items-center mb-6 gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-full border border-gray-300 max-w-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                />
                <button
                    onClick={() => navigate("/pet-dashboard/create")}
                    className="relative px-6 py-2 rounded-full font-semibold text-white overflow-hidden group"
                    style={{ border: "2px solid #8B4513", backgroundColor: "#8B4513" }}
                >
                    <span className="absolute inset-0 bg-white scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"></span>
                    <span className="relative z-10 group-hover:text-[#8B4513] transition-colors duration-500">
                        + Add New Pet
                    </span>
                </button>
            </div>

            {loading ? (
                <p className="text-center">Loading pets...</p>
            ) : (
                <PetList pets={filteredPets} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default PetDashboard;
