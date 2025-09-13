import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const EmailVerifiedSuccess = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "http://localhost:5173/login";
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center text-center max-w-sm w-full animate-fadeIn">
                {/* Icon */}
                <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 animate-pop" />

                {/* Tiêu đề */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Email Verified
                </h1>

                {/* Nội dung */}
                <p className="text-gray-500 mb-6">
                    Your email has been successfully verified.
                    Redirecting you to login...
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-2 animate-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerifiedSuccess;