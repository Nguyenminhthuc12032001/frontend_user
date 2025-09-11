import React, { useState } from "react";
import { createPet } from "../../api/managepet";

const CreatePet = () => {
    const [imageLinks, setImageLinks] = useState([""]);
    const [loading, setLoading] = useState(false);

    // Cập nhật 1 ô nhập link
    const handleImageChange = (index, value) => {
        const newLinks = [...imageLinks];
        newLinks[index] = value;
        setImageLinks(newLinks);
    };

    // Thêm 1 ô nhập link mới
    const addImageField = () => {
        setImageLinks([...imageLinks, ""]);
    };

    // Xóa 1 ô nhập link
    const removeImageField = (index) => {
        const newLinks = imageLinks.filter((_, i) => i !== index);
        setImageLinks(newLinks);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validLinks = imageLinks.filter(link => link.trim() !== "");
        if (validLinks.length === 0) {
            alert("Please enter at least one image link");
            return;
        }

        setLoading(true);

        const payload = {
            name: e.target.name.value,
            species: e.target.species.value,
            breed: e.target.breed.value,
            age: parseInt(e.target.age.value, 10),
            gender: e.target.gender.value,
            images: validLinks, // mảng string
        };

        console.log("Payload gửi đi:", payload);

        try {
            const res = await createPet(payload);
            console.log("Response:", res);
            alert("Pet added successfully!");
            e.target.reset();
            setImageLinks([""]);
        } catch (err) {
            console.error("Error adding pet:", err);
            alert("Failed to add pet!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add New Pet</h2>

            <div className="mb-3">
                <label>Pet Name:</label>
                <input type="text" name="name" required className="w-full border p-2 rounded" />
            </div>

            <div className="mb-3">
                <label>Species:</label>
                <input type="text" name="species" required className="w-full border p-2 rounded" />
            </div>

            <div className="mb-3">
                <label>Breed:</label>
                <input type="text" name="breed" required className="w-full border p-2 rounded" />
            </div>

            <div className="mb-3">
                <label>Age:</label>
                <input type="number" name="age" required className="w-full border p-2 rounded" />
            </div>

            <div className="mb-3">
                <label>Gender:</label>
                <select name="gender" required className="w-full border p-2 rounded">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            {/* Nhập link ảnh */}
            <div className="mb-3">
                <label>Pet Images (links):</label>
                {imageLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border p-2 rounded"
                        />
                        {imageLinks.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeImageField(idx)}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addImageField}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                >
                    + Add another image
                </button>
            </div>

            {/* Preview */}
            {imageLinks.some(link => link.trim() !== "") && (
                <div className="mb-3 flex gap-2 flex-wrap">
                    {imageLinks.filter(link => link.trim() !== "").map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            className="w-24 h-24 object-cover rounded border"
                        />
                    ))}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                {loading ? "Adding..." : "Add Pet"}
            </button>
        </form>
    );
};

export default CreatePet;
