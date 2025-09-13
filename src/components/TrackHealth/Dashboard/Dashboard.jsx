import React, { useState, useEffect } from 'react';
import { getHealthRecordByPet } from '../../../api/health';  // Import API
import { ClipLoader } from 'react-spinners';  // Thêm spinner loading

const Dashboard = ({ petId }) => {
    const [petHealth, setPetHealth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Thêm state lỗi

    useEffect(() => {
        // Lấy thông tin sức khỏe thú cưng theo petId
        const fetchPetHealth = async () => {
            try {
                const records = await getHealthRecordByPet(petId);
                setPetHealth(records);  // Cập nhật thông tin sức khỏe thú cưng
                setLoading(false);  // Đặt trạng thái loading thành false khi dữ liệu đã tải xong
            } catch (error) {
                console.error("Failed to fetch pet health records:", error);
                setError("There was an issue fetching the pet's health records. Please try again later.");
                setLoading(false);
            }
        };

        fetchPetHealth();
    }, [petId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();  // Chuyển đổi thành định dạng ngày tháng của địa phương
    };

    return (
        <div className="dashboard">
            <h1>Pet Health Dashboard</h1>
            {loading ? (
                <div className="loading-spinner">
                    <ClipLoader color="#36D7B7" loading={loading} size={50} />
                </div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <h2>Health Timeline</h2>
                    {petHealth.length === 0 ? (
                        <div>
                            <p>No health records found for this pet.</p>
                        </div>
                    ) : (
                        <div className="health-records">
                            {petHealth.map((record, index) => (
                                <div className="health-record" key={index}>
                                    <h3>{formatDate(record.date)}</h3>
                                    <p><strong>Description:</strong> {record.description}</p>
                                    <p><strong>Details:</strong> {record.details}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
