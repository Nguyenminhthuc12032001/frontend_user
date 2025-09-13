import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUpload from "../../hook/useUpload";
import backgroundImage from "../../assets/images/create_pet_background.png";
import "../../assets/css/CreatePet.css"; // Add your own CSS for any effects

const CreatePet = () => {
    const [form, setForm] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
    });
    const [files, setFiles] = useState([]);
    const { uploadFile, loading } = useUpload();
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const upload = [];
        for (const file of files) {
            try {
                const img = await uploadFile(file, 'pets');
                console.log(img);
                upload.push(img);
            } catch (error) {
                console.error("Error uploading file:", error);
                setError("Failed to upload images. Please try again.");
                return;  // Ngừng submit nếu có lỗi tải lên.
            }
        }

        const payload = {
            ...form,
            age: Number(form.age),
            images_url: upload,
        };

        try {
            // Lấy JWT token từ localStorage
            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("Token không hợp lệ hoặc đã hết hạn.");
                return;
            }

            const res = await axios.post("http://localhost:5000/api/pet/createNew", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setMsg(res.data.msg);
            setError(null);  // Reset any previous errors
            console.log("Create new pet successfully.", res.data);
            navigate("/pet-dashboard");
        } catch (err) {
            setError(`Failed to add pet. Error: ${err.message}`);
            setMsg(null);  // Reset any previous success messages
            console.error("Error details:", err.response || err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
            }}
        >
            <div className="absolute inset-0 bg-black/20"></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-lg space-y-4"
            >
                <h2
                    className="text-3xl font-extrabold text-center"
                    style={{ color: "#8B4513", textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
                >
                    Add New Pet
                </h2>

                {/* Form Fields */}
                {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Species", name: "species", type: "text" },
                    { label: "Breed", name: "breed", type: "text" },
                    { label: "Age", name: "age", type: "number" },
                ].map((field, idx) => (
                    <div key={idx}>
                        <label style={{ color: "#8B4513", fontWeight: "500" }}>
                            {field.label}:
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            required
                            className="w-full p-3 mt-1 rounded-xl border border-white/50 bg-white/50 text-brown placeholder:text-brown/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            style={{ color: "#8B4513" }}
                        />
                    </div>
                ))}

                {/* Gender Select */}
                <div>
                    <label style={{ color: "#8B4513", fontWeight: "500" }}>Gender:</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        required
                        className="w-full p-3 mt-1 rounded-xl border border-white/50 bg-white/50 text-brown focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        style={{ color: "#8B4513" }}
                    >
                        <option value="" style={{ color: "#8B4513" }}>Select Gender</option>
                        <option value="Male" style={{ color: "#8B4513" }}>Male</option>
                        <option value="Female" style={{ color: "#8B4513" }}>Female</option>
                    </select>
                </div>

                {/* Error and Success Messages */}
                {msg && (
                    <div className="bg-green-100 text-green-800 p-2 rounded-md text-center">
                        {msg}
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-800 p-2 rounded-md text-center">
                        {error}
                    </div>
                )}

                {/* File Upload */}
                <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Pet Images
                    </label>

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
                                <div className="w-14 h-14 mx-auto bg-black/10 rounded-full flex items-center justify-center">
                                    <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m-6-6h12" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-900">Click or drag to upload</p>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50 transition-all duration-200">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newFiles = [...files];
                                                newFiles.splice(index, 1);
                                                setFiles(newFiles);
                                            }}
                                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-600 rounded-full w-7 h-7 flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.01] disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                <span>Adding Pet...</span>
                            </div>
                        ) : (
                            "Add Pet"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePet;
