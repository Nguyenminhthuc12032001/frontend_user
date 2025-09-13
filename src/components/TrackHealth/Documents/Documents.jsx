import React, { useState, useEffect } from 'react';
import { getHealthRecordByPet } from '../../../api/health';  // Import API

const Documents = ({ petId }) => {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy tài liệu của thú cưng theo petId
        const fetchDocuments = async () => {
            try {
                const records = await getHealthRecordByPet(petId);
                // Giả sử mỗi record có một mảng 'documents' chứa các tài liệu
                const allDocuments = records.flatMap(record => record.documents || []);
                setDocuments(allDocuments);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [petId]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                // Gửi file lên backend (sửa đường dẫn API nếu cần)
                await fetch('API_UPLOAD_URL_HERE', {
                    method: 'POST',
                    body: formData,
                });
                alert('File uploaded successfully');
                // Tải lại danh sách tài liệu sau khi tải lên
                setDocuments([...documents, { name: file.name, url: 'file_url_here' }]);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="documents">
            <h1>Pet Documents</h1>
            {loading ? (
                <p>Loading documents...</p>
            ) : (
                <div>
                    <div className="document-upload">
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload Document</button>
                    </div>

                    <div className="document-list">
                        <h2>Documents List</h2>
                        {documents.length === 0 ? (
                            <p>No documents found for this pet.</p>
                        ) : (
                            <ul>
                                {documents.map((doc, index) => (
                                    <li key={index}>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                            {doc.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
