import React, { useState, useEffect } from 'react';
import { getHealthRecordByPet } from '../../../api/health';  // Import API

const Dashboard = ({ petId }) => {
    const [petHealth, setPetHealth] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy thông tin sức khỏe thú cưng theo petId
        const fetchPetHealth = async () => {
            try {
                const records = await getHealthRecordByPet(petId);
                setPetHealth(records);  // Cập nhật thông tin sức khỏe thú cưng
                setLoading(false);  // Đặt trạng thái loading thành false khi dữ liệu đã tải xong
            } catch (error) {
                console.error("Failed to fetch pet health records:", error);
                setLoading(false);
            }
        };
        fetchPetHealth();
    }, [petId]);

    return (
        <div className="dashboard">
            <h1>Pet Health Dashboard</h1>
            {loading ? (
                <p>Loading pet health data...</p>
            ) : (
                <div>
                    <h2>Health Timeline</h2>
                    {petHealth.length === 0 ? (
                        <p>No health records found for this pet.</p>
                    ) : (
                        <ul>
                            {petHealth.map((record, index) => (
                                <li key={index}>
                                    <p><strong>{record.date}</strong>: {record.description}</p>
                                    <p>{record.details}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
