import { useState } from "react";
import { createHealthRecord } from "../../api/health.js"; // sửa đường dẫn theo project của bạn

export default function CreateHealthRecord({ petId, onCreated }) {
    const [record, setRecord] = useState({
        pet_id: petId || "",
        title: "",
        type: "",
        description: "",
        date: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await createHealthRecord(record);
            if (onCreated) onCreated(); // gọi callback để refresh danh sách
            setRecord({
                pet_id: petId || "",
                title: "",
                type: "",
                description: "",
                date: "",
            });
        } catch (err) {
            setError(err?.response?.data?.message || "Tạo health record thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white shadow rounded"
        >
            <h2 className="text-lg font-semibold mb-4">Tạo Health Record</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="mb-3">
                <label className="block font-medium mb-1">Ngày</label>
                <input
                    type="date"
                    name="date"
                    value={record.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="block font-medium mb-1">Tiêu đề</label>
                <input
                    type="text"
                    name="title"
                    value={record.title}
                    onChange={handleChange}
                    placeholder="VD: Tiêm vắc-xin dại"
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="block font-medium mb-1">Loại</label>
                <select
                    name="type"
                    value={record.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">-- Chọn loại --</option>
                    <option value="vaccine">Tiêm chủng</option>
                    <option value="treatment">Điều trị</option>
                    <option value="surgery">Phẫu thuật</option>
                    <option value="checkup">Khám định kỳ</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="block font-medium mb-1">Mô tả</label>
                <textarea
                    name="description"
                    value={record.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border p-2 rounded"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
                {loading ? "Đang lưu..." : "Tạo"}
            </button>
        </form>
    );
}
