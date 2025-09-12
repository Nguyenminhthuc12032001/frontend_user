import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById, updatePet } from "../../api/managepet";
import backgroundImage from "../../assets/images/create_pet_background.png";
import "../../assets/css/CreatePet.css"; // dùng chung CSS để có hiệu ứng shine

const EditPet = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        images: [],
    });
    const [imageLinks, setImageLinks] = useState([""]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const brownColor = "#8B4513";

    // Lấy dữ liệu pet và set sẵn cho form
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(id);
                console.log("API response:", data);

                const petData = data?.pet || data;

                setPet({
                    name: petData.name || "",
                    species: petData.species || "",
                    breed: petData.breed || "",
                    age: petData.age != null ? String(petData.age) : "",
                    gender: petData.gender || "",
                    images: petData.images || [],
                });

                setImageLinks(petData.images && petData.images.length ? petData.images : [""]);
            } catch (err) {
                console.error(err);
                alert("Failed to load pet info");
            } finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPet((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, value) => {
        const newLinks = [...imageLinks];
        newLinks[index] = value;
        setImageLinks(newLinks);
    };

    const addImageField = () => {
        if (imageLinks.length >= 5) {
            alert("You can only add up to 5 images.");
            return;
        }
        setImageLinks([...imageLinks, ""]);
    };

    const removeImageField = (index) => {
        setImageLinks(imageLinks.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validLinks = imageLinks.filter((link) => link.trim() !== "");
        if (!validLinks.length) return alert("Please enter at least one image link");

        setSaving(true);

        const payload = {
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: parseInt(pet.age, 10),
            gender: pet.gender,
            images: validLinks.slice(0, 5),
        };

        try {
            await updatePet(id, payload);
            alert("Pet updated successfully!");
            navigate("/pet-dashboard");
        } catch (err) {
            console.error(err);
            alert("Failed to update pet!");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return <p className="text-center mt-6">Loading pet information...</p>;

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
                    style={{ color: brownColor, textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
                >
                    Edit Pet
                </h2>

                {["name", "species", "breed", "age"].map((field, idx) => (
                    <div key={idx}>
                        <label style={{ color: brownColor, fontWeight: "500" }}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <input
                            type={field === "age" ? "number" : "text"}
                            name={field}
                            value={pet[field] || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 rounded-xl border border-white/50 bg-white/50 text-brown placeholder:text-brown/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            style={{ color: brownColor }}
                        />
                    </div>
                ))}

                <div>
                    <label style={{ color: brownColor, fontWeight: "500" }}>Gender:</label>
                    <select
                        name="gender"
                        value={pet.gender || ""}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mt-1 rounded-xl border border-white/50 bg-white/50 text-brown focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        style={{ color: brownColor }}
                    >
                        <option value="" style={{ color: brownColor }}>
                            Select Gender
                        </option>
                        <option value="Male" style={{ color: brownColor }}>
                            Male
                        </option>
                        <option value="Female" style={{ color: brownColor }}>
                            Female
                        </option>
                    </select>
                </div>

                <div>
                    <label style={{ color: brownColor, fontWeight: "500" }}>
                        Pet Images (links):
                    </label>
                    {imageLinks.map((link, idx) => (
                        <div key={idx} className="flex gap-2 mt-2">
                            <input
                                type="text"
                                value={link}
                                onChange={(e) => handleImageChange(idx, e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 p-3 rounded-xl border border-white/50 bg-white/50 placeholder:text-brown/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                                style={{ color: brownColor }}
                            />
                            {imageLinks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeImageField(idx)}
                                    className="px-3 py-2 rounded-xl bg-red-500 text-white shadow-md btn-shine transition-all duration-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {imageLinks.length < 5 && (
                        <button
                            type="button"
                            onClick={addImageField}
                            className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 btn-shine"
                        >
                            + Add another image
                        </button>
                    )}
                </div>

                {imageLinks.some((link) => link.trim()) && (
                    <div className="flex gap-2 flex-wrap mt-3">
                        {imageLinks
                            .filter((link) => link.trim())
                            .slice(0, 5)
                            .map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`preview-${idx}`}
                                    className="w-24 h-24 object-cover rounded-xl border border-white/50 hover:scale-110 transition-transform duration-200"
                                />
                            ))}
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/pet-dashboard")}
                        className="px-6 py-3 rounded-xl border border-brown text-brown font-semibold hover:bg-brown/20 hover:scale-105 transition-all duration-300 shadow-md btn-shine"
                        style={{ color: brownColor, borderColor: brownColor }}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg btn-shine ${
                            saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-yellow-600 to-yellow-800 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        }`}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPet;