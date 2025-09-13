import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Component dùng để wrap các route cần login
const PrivateRoute = () => {
    const token = localStorage.getItem("token"); // kiểm tra token

    // Nếu không có token, redirect về login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Nếu có token, cho phép render các route con
    return <Outlet />;
};

export default PrivateRoute;
