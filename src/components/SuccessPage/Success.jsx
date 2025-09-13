import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#fdf4eb",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <img
                src={successImg}
                alt="Success"
                style={{ width: "150px", marginBottom: "30px" }}
            />
            <h1 style={{ color: "#8B4513", marginBottom: "20px" }}>
                登録が成功しました！
            </h1>
            <p style={{ color: "#5B4636", marginBottom: "30px" }}>
                ご登録ありがとうございます。メールをご確認ください。
            </p>
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#8B4513",
                    color: "#F5F5DC",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
            >
                ログインページへ
            </button>
        </div>
    );
};

export default SuccessPage;
