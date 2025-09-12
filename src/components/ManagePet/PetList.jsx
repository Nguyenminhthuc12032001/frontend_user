import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PetList = ({ pets, onDelete }) => {
    const navigate = useNavigate();
    const petsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    if (!pets || pets.length === 0) {
        return <p className="text-center mt-6 text-gray-700">No pets found.</p>;
    }

    const totalPages = Math.ceil(pets.length / petsPerPage);
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > totalPages) pageNumber = totalPages;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentPets.map((pet) => (
                    <div
                        key={pet._id}
                        className="relative rounded-lg overflow-hidden h-64 w-full shadow-lg flex items-end group"
                    >
                        {/* Background image */}
                        {pet.images && pet.images.length > 0 && (
                            <div
                                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-110"
                                style={{
                                    backgroundImage: `url(${pet.images[0]})`,
                                    filter: "brightness(70%)",
                                }}
                                onClick={() => navigate(`/pet-details/${pet._id}`)}
                            ></div>
                        )}

                        {/* Info overlay */}
                        <div
                            className="relative z-10 p-4 m-2 w-full rounded-md transition-colors duration-500 group-hover:bg-[rgba(0,0,0,0.7)]"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.3)",
                                color: "#f5f5dc",
                            }}
                        >
                            <h3 className="text-lg font-bold drop-shadow-md">{pet.name}</h3>
                            <p className="drop-shadow-md"><strong>Species:</strong> {pet.species}</p>
                            <p className="drop-shadow-md"><strong>Breed:</strong> {pet.breed}</p>
                            <p className="drop-shadow-md"><strong>Age:</strong> {pet.age}</p>
                            <p className="drop-shadow-md"><strong>Gender:</strong> {pet.gender}</p>

                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => navigate(`edit/${pet._id}`)}
                                    className="flex-1 px-3 py-2 rounded-lg
                   bg-gradient-to-r from-[#A0522D] to-[#8B4513]
                   text-beige font-semibold shadow
                   hover:from-[#8B4513] hover:to-[#A0522D]
                   hover:scale-105 transition-all duration-300"
                                    style={{color: "#f5f5dc"}} // chữ màu be
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => onDelete(pet._id)}
                                    className="flex-1 px-3 py-2 rounded-lg
                   bg-gradient-to-r from-[#f5f5dc] to-[#8B0000]
                   text-[#8B4513] font-semibold shadow
                   hover:from-[#8B0000] hover:to-[#f5f5dc]
                   hover:scale-105 transition-all duration-300"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${
                        currentPage === 1
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                >
                    First
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${
                        currentPage === 1
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${
                            currentPage === index + 1
                                ? "bg-yellow-700 text-white"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${
                        currentPage === totalPages
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow ${
                        currentPage === totalPages
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default PetList;
