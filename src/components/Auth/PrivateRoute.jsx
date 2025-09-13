import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // render các route con
};

export default PrivateRoute;
