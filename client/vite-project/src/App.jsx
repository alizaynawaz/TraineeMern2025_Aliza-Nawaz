// src/App.jsx
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email || "example@example.com";
  const userImage = user?.image || "https://via.placeholder.com/100";

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar with toggle control */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          userEmail={userEmail}
          userImage={userImage}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Routes */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

export default App;








