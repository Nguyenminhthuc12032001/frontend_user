import { useState } from "react";
import useUpload from "../../hook/useUpload"; // Giả sử bạn đã có hook này để upload ảnh
import axios from "axios";

export default function CreateHealthRecord({ petId }) {
    const [form, setForm] = useState({
        pet_id: petId || "", // Pet ID
        title: "",
        type: "",
        date: "",
        description: "",
    });

    const [files, setFiles] = useState([]);
    const { uploadFile, loading } = useUpload();
    const [msg, setMsg] = useState();
    const [error, setError] = useState();

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const upload = [];
        for (const file of files) {
            const img = await uploadFile(file, 'health');
            console.log(img);
            upload.push(img);
        }

        const payload = {
            ...form,
            date: new Date(form.date).toISOString(), // Chuyển đổi ngày sang định dạng ISO
            images_url: upload, // List of uploaded images
        };

        try {
            const res = await axios.post("http://localhost:5000/api/health/create", payload, {
                headers: {
                    Authorization: "Bearer your_token_here",
                },
            });
            setMsg(res.data.msg);
            setError(res.data.error);
            console.log("Create new health record successfully.", res.data);
        } catch (error) {
            console.log(error);
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
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Create Health Record</h1>
                        <p className="text-base text-gray-500">Add details about your pet's health</p>
                        <p className="text-base text-yellow-500">{msg}</p>
                        <p className="text-base text-red-500">{error}</p>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Pet ID */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pet ID</label>
                            <input
                                name="pet_id"
                                value={form.pet_id}
                                onChange={(e) => setForm({ ...form, pet_id: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all"
                                disabled // Disable this field if pet_id is provided already
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Enter record title"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all"
                            >
                                <option value="">-- Select type --</option>
                                <option value="vaccine">Vaccination</option>
                                <option value="treatment">Treatment</option>
                                <option value="checkup">Checkup</option>
                                <option value="surgery">Surgery</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Describe the health record details..."
                                rows="4"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">Health Record Images</label>

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
                                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                                                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
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
                                    <div className="flex items-center justify-center py-3 border-t border-gray-200 mt-4">
                                        <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                                            <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m-6-6h12" />
                                                </svg>
                                            </div>
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
                            className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.01] disabled:transform-none"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating...</span>
                                </div>
                            ) : (
                                "Create Health Record"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
