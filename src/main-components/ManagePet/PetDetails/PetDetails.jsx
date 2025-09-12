import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById } from "../../../api/managepet";

const PetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(id);
                if (!data || !data.pet) {
                    setError("Pet not found");
                    return;
                }
                setPet(data.pet);
            } catch (err) {
                console.error(err);
                setError("Unable to load pet data");
            } finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [id]);

    if (loading) return <p className="text-center mt-6">Loading pet details...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
    if (!pet) return <p className="text-center mt-6">Pet not found.</p>;

    const imgCount = pet.images ? pet.images.length : 0;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded mt-6">
            {/* Header: Name ở giữa + Back Button bên phải */}
            <div className="flex justify-between items-center mb-4">
                {/* Spacer để giữ tên giữa */}
                <div className="flex-1"></div>

                {/* Tên thú cưng */}
                <h2 className="text-3xl font-bold text-center flex-1" style={{ color: "#8B4513" }}>
                    <span style={{ color: "#e89c31" }}>{pet.name}</span>
                </h2>

                {/* Back Button bên phải */}
                <div className="flex-1 flex justify-end">
                    <button
                        onClick={() => navigate("/pet-dashboard")}
                        className="relative px-6 py-2 rounded-full font-semibold text-white overflow-hidden group"
                        style={{ border: "2px solid #8B4513", backgroundColor: "#8B4513" }}
                    >
                        {/* Layer nền trắng mở ra từ giữa */}
                        <span
                            className="absolute inset-0 bg-white scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                            style={{ transformOrigin: "center" }}
                        ></span>
                        {/* Text */}
                        <span className="relative z-10 group-hover:text-[#8B4513] transition-colors duration-500">
                            Back to Dashboard
                        </span>
                    </button>
                </div>
            </div>

            {/* Pet Information */}
            <div className="space-y-3 text-lg mb-6">
                <p>
                    <strong style={{ color: "#8B4513" }}>Species:</strong>{" "}
                    <span style={{ color: "#e89c31" }}>{pet.species}</span>
                </p>
                <p>
                    <strong style={{ color: "#8B4513" }}>Age:</strong>{" "}
                    <span style={{ color: "#e89c31" }}>{pet.age} years</span>
                </p>
                <p>
                    <strong style={{ color: "#8B4513" }}>Gender:</strong>{" "}
                    <span style={{ color: "#e89c31" }}>{pet.gender}</span>
                </p>
                <p>
                    <strong style={{ color: "#8B4513" }}>Description:</strong>{" "}
                    <span style={{ color: "#e89c31" }}>{pet.description}</span>
                </p>
            </div>

            {/* Images */}
            {imgCount === 0 && (
                <div className="text-center text-gray-500">No images available</div>
            )}

            {imgCount === 1 && (
                <div className="flex justify-center mb-6">
                    <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full max-w-md h-96 object-cover rounded-lg shadow"
                    />
                </div>
            )}

            {imgCount === 2 && (
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow"
                    />
                    <img
                        src={pet.images[1]}
                        alt={`${pet.name}-1`}
                        className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow"
                    />
                </div>
            )}

            {imgCount >= 3 && (
                <div className="flex flex-col gap-4 mb-6">
                    {/* Main Image */}
                    <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full h-96 object-cover rounded-lg shadow"
                    />

                    {/* Gallery */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {pet.images.slice(1).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${pet.name}-${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;
