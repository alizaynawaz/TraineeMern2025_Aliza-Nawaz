// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfilePic from "../assets/defaultProfilePic.png";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = "decyxmdej";
const UPLOAD_PRESET = "Auth_app";

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(defaultProfilePic);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = res.data;

        // Agar backend se image URL hai toh use set karo warna default
        const fullImage =
          profileData.image && profileData.image !== ""
            ? profileData.image
            : defaultProfilePic;

        setUser(profileData);
        setPreview(fullImage);
        setFormData({
          name: profileData.name || "",
          email: profileData.email || "",
          age: profileData.age || "",
          gender: profileData.gender || "",
          image: fullImage,
        });
      } catch (error) {
        console.error("Error fetching profile", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [setUser, navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview for user feedback
    setPreview(URL.createObjectURL(file));

    // Upload image to Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const uploaded = await res.json();
      // Set Cloudinary URL in formData
      setFormData((prev) => ({ ...prev, image: uploaded.secure_url }));
      setPreview(uploaded.secure_url); // Update preview to uploaded image URL
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = res.data.user || res.data;

      const updatedImage =
        updatedUser.image && updatedUser.image !== ""
          ? updatedUser.image
          : defaultProfilePic;

      setUser(updatedUser);
      setPreview(updatedImage);
      setFormData((prev) => ({
        ...prev,
        image: updatedImage,
      }));

      alert("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Error updating profile");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
          />
          <h2 className="text-xl font-bold mt-4 mb-2 text-gray-800">
            Edit Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {uploading ? "Please wait..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
























