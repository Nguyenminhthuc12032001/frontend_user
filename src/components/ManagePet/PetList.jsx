import React from "react";

const PetList = ({ pets }) => {
    if (!pets || pets.length === 0) {
        return <p className="text-center mt-6">No pets found.</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Pet List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pets.map((pet) => (
                    <div
                        key={pet._id}   // ✅ backend trả về _id, không phải id
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                        <p><strong>Species:</strong> {pet.species}</p>
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        <p><strong>Age:</strong> {pet.age}</p>
                        <p><strong>Gender:</strong> {pet.gender}</p>

                        {pet.images && pet.images.length > 0 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {pet.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={pet.name}
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetList;
