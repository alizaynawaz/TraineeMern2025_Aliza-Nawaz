// src/components/Sidebar.jsx

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useUser } from "../context/UserContext";
import defaultProfilePic from "../assets/defaultProfilePic.png";

function Sidebar({ onClose, onLogout }) {
    const { user } = useUser();

    //  Image source handling
    const profileImage = user?.image
        ? user.image.startsWith("http")
            ? user.image
            : `http://localhost:5000${user.image}`
        : defaultProfilePic;

    return (
        <div className="w-72 h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white shadow-xl p-6 fixed top-0 left-0 z-50 transition-transform">
            {/* Close Button */}
            <div className="flex justify-end mb-2 md:hidden">
                <button onClick={onClose}>
                    <X className="w-5 h-5 text-white hover:text-gray-200" />
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center mb-10">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-semibold mt-3 text-white">
                    {user?.name || "User Name"}
                </h3>
                <p className="text-sm text-blue-100 text-center break-words">
                    {user?.email || ""}
                </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
                <Link
                    to="/"
                    onClick={onClose}
                    className="px-4 py-2 rounded hover:bg-white hover:text-blue-600 transition"
                >
                    Dashboard
                </Link>
                <Link
                    to="/profile"
                    onClick={onClose}
                    className="px-4 py-2 rounded hover:bg-white hover:text-blue-600 transition"
                >
                    Profile
                </Link>
                <Link
                    to="/users"
                    onClick={onClose}
                    className="px-4 py-2 rounded hover:bg-white hover:text-blue-600 transition"
                >
                    Users
                </Link>

                <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded hover:bg-red-100 hover:text-red-600 text-red-200 transition text-left"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Sidebar;












