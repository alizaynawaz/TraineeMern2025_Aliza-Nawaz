// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import "./index.css";

//  Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

//  Import UserProvider
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider> {/* 🔹 Added here */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);




