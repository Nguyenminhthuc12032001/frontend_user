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
        const texts = [
            "What your pet name?",
            `It’s a ${firstPetBreed}`,
            "How old your pet"
        ];
        let currentText = 0;
        let adding = true;

        const typeInterval = setInterval(() => {
            if (adding) {
                setPlaceholder(texts[currentText].slice(0, index + 1));
                index++;
                if (index >= texts[currentText].length) {
                    adding = false;
                }
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
        if (!search) {
            setFilteredPets(pets);
        } else {
            const lowerSearch = search.toLowerCase();
            const filtered = pets.filter((pet) => {
                const nameMatch = pet.name?.toLowerCase().includes(lowerSearch);
                const ageMatch = pet.age?.toString().includes(lowerSearch);
                const breedMatch = pet.breed?.toLowerCase().includes(lowerSearch);
                return nameMatch || ageMatch || breedMatch;
            });
            setFilteredPets(filtered);
        }
    }, [search, pets]);

    // ✅ Hàm xoá pet
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1
                    className="text-4xl font-bold flex-1 text-center md:text-left"
                    style={{ color: "#8B4513" }}
                >
                    Pet List
                </h1>

                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 flex-1 max-w-sm"
                />

                <div className="flex-1 flex justify-end">
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
