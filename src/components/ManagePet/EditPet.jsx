import { useState, useEffect } from "react";
import axios from "axios";
import useUpload from "../../hook/useUpload"; // Assuming you have a custom hook for file uploads

export default function EditPet({ petId }) {
    const [form, setForm] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        description: "",
    });
    const [files, setFiles] = useState([]);
    const { uploadFile, loading } = useUpload();
    const [msg, setMsg] = useState();
    const [error, setError] = useState();

    // Fetch pet data when component loads
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/pet/get/${petId}`);
                setForm({
                    name: res.data.pet.name,
                    species: res.data.pet.species,
                    breed: res.data.pet.breed,
                    age: res.data.pet.age,
                    gender: res.data.pet.gender,
                    description: res.data.pet.description,
                });

                if (res.data.pet.images) {
                    setFiles(res.data.pet.images);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch pet data.");
            }
        };
        fetchPet();
    }, [petId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle image upload
        const upload = [];
        for (const file of files) {
            if (file instanceof File) {
                const img = await uploadFile(file, `pets`);
                upload.push(img);
            } else {
                upload.push(file); // Keep old image URLs
            }
        }

        const payload = {
            ...form,
            age: Number(form.age),
            images: upload,
        };

        try {
            const res = await axios.put(
                `http://localhost:5000/api/pet/update/${petId}`,
                payload,
                { headers: { Authorization: "Bearer YOUR_AUTH_TOKEN" } }
            );
            setMsg(res.data.msg);
            setError(res.data.error);
            console.log("Pet updated successfully.", res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to update pet.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 space-y-8 border border-gray-200"
                >
                    {/* Title */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Edit Pet</h1>
                        <p className="text-base text-gray-500">Edit your pet's details</p>
                        <p className="text-base text-yellow-500">{msg}</p>
                        <p className="text-base text-red-500">{error}</p>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4"
                            />
                        </div>

                        {/* Species */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                            <input
                                value={form.species}
                                onChange={(e) => setForm({ ...form, species: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4"
                            />
                        </div>

                        {/* Breed */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                            <input
                                value={form.breed}
                                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                            <input
                                type="number"
                                value={form.age}
                                onChange={(e) => setForm({ ...form, age: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                value={form.gender}
                                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                rows="4"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 resize-none"
                            />
                        </div>

                        {/* Upload Images */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">Pet Images</label>

                            {files.length === 0 ? (
                                <div className="relative border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-2xl p-8 text-center transition-all duration-200 bg-gray-50 hover:bg-gray-100">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => setFiles(Array.from(e.target.files))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium text-gray-900">Click or drag to upload</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border">
                                                <img
                                                    src={file.url ? file.url : URL.createObjectURL(file)}
                                                    alt={file.name || `image-${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newFiles = [...files];
                                                        newFiles.splice(index, 1);
                                                        setFiles(newFiles);
                                                    }}
                                                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 rounded-full w-7 h-7 flex items-center justify-center"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-center py-3 border-t border-gray-200 mt-4">
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <span className="text-sm font-medium">Add more images</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl"
                        >
                            {loading ? "Updating..." : "Update Pet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
