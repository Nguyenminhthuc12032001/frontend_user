import { useState } from "react";
import axios from "axios";

export default function useUpload() {
    const [loading, setLoading] = useState(false);

    const uploadFile = async (File, folder) => {
        setLoading(true);

        const signRes = await axios.post("http://localhost:5000/api/upload/sign-upload",
            {
                folder
            }, 
            {
            headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzNiZjFjNTJmYjIyOGI4ZTVkYWU0NSIsInJvbGUiOiJhZG1pbiIsInZlcnNpb25Ub2tlbiI6MCwiaWF0IjoxNzU3NzkwNzUwLCJleHAiOjE3NTgxNTA3NTB9.PVPoc0gh4wmlY7Loq3qOFCpZCkvGk3Cw1r2iFOtM1lQ" }
        })
        console.log(signRes);

        const { timestamp, signature, api_key, cloud_name, folder_signed } = signRes.data;

        const data = new FormData();
        data.append("file", File);
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        data.append("api_key", api_key);
        data.append("folder", folder_signed);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            { method: "POST", body: data }
        )
        const result = await res.json();
        setLoading(false);

        return {
            url: result.secure_url,
            public_id: result.public_id
        }
    };

    return { uploadFile, loading };

}