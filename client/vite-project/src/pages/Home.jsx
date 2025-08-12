import { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
} from "chart.js";
import { Doughnut, Pie, Bar, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
);

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("http://localhost:5000/api/auth/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Failed to fetch users:", err));
    }, []);

    const monthlyCounts = Array(12).fill(0);
    const genderCounts = { male: 0, female: 0 };
    const ageGroups = { '18-25': 0, '26-35': 0, '36-50': 0, '51+': 0 };

    users.forEach(user => {
        const createdAt = new Date(user.createdAt || user.created_at || Date.now());
        monthlyCounts[createdAt.getMonth()]++;

        const gender = (user.gender || "").toLowerCase();
        if (gender === "male") genderCounts.male++;
        else if (gender === "female") genderCounts.female++;

        const age = parseInt(user.age);
        if (!isNaN(age)) {
            if (age <= 25) ageGroups['18-25']++;
            else if (age <= 35) ageGroups['26-35']++;
            else if (age <= 50) ageGroups['36-50']++;
            else ageGroups['51+']++;
        }
    });

    const barChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "User Registrations",
            data: monthlyCounts,
            backgroundColor: "#3B82F6",
            borderRadius: 6,
        }]
    };

    const genderChartData = {
        labels: ["Male", "Female"],
        datasets: [{
            data: [genderCounts.male, genderCounts.female],
            backgroundColor: ["#3B82F6", "#F472B6"],
        }]
    };

    const ageChartData = {
        labels: Object.keys(ageGroups),
        datasets: [{
            data: Object.values(ageGroups),
            backgroundColor: ["#93C5FD", "#A5F3FC", "#FDBA74", "#FECACA"],
        }]
    };

    const responseChartData = {
        labels: ["Promoters", "Passives", "Detractors"],
        datasets: [{
            data: [612, 101, 101],
            backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
        }]
    };

    const growthChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Monthly Growth",
                data: monthlyCounts,
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                fill: true,
                tension: 0.3,
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-6">
            <h2 className="text-4xl font-bold mb-8 text-blue-900">Dashboard</h2>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-8">
                {["All Segments", "All Companies", "Last 7 Days"].map((label, i) => (
                    <select
                        key={i}
                        className="border px-4 py-2 rounded-lg bg-white text-gray-700 shadow-sm hover:shadow-md transition"
                    >
                        <option>{label}</option>
                    </select>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                    { label: "Total Users", value: users.length, color: "blue" },
                    { label: "Male", value: genderCounts.male, color: "green" },
                    { label: "Female", value: genderCounts.female, color: "pink" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-center"
                    >
                        <p className="text-gray-500 text-sm">{item.label}</p>
                        <h2 className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</h2>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Monthly Registrations */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">Monthly Registrations</h3>
                    <div style={{ height: "200px" }}>
                        <Bar
                            data={barChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                {/* Responses */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">Responses</h3>
                    <div style={{ height: "200px" }}>
                        <Doughnut data={responseChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className="text-xs mt-3 text-center">
                        <p className="text-green-600 font-semibold">Promoters: 612 (80%)</p>
                        <p className="text-yellow-600 font-semibold">Passives: 101 (10%)</p>
                        <p className="text-red-600 font-semibold">Detractors: 101 (10%)</p>
                    </div>
                </div>

                {/* Age Group Distribution */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">Age Group Distribution</h3>
                    <div style={{ height: "200px" }}>
                        <Pie data={ageChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* Gender Distribution */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">Gender Distribution</h3>
                    <div style={{ height: "200px" }}>
                        <Doughnut data={genderChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* User Capacity */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">User Capacity</h3>
                    <div style={{ height: "200px" }}>
                        <Doughnut
                            data={{
                                labels: ["Registered", "Remaining"],
                                datasets: [{
                                    data: [users.length, 100 - users.length],
                                    backgroundColor: ["#60A5FA", "#E5E7EB"],
                                }],
                            }}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                    <p className="text-center mt-2 text-blue-700 text-sm">
                        {users.length} out of 100 users registered
                    </p>
                </div>

                {/* Monthly Growth Trend */}
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-base font-semibold mb-3 text-blue-700">Monthly Growth Trend</h3>
                    <div style={{ height: "200px" }}>
                        <Line
                            data={growthChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* View All Users Link */}
            <div className="text-center mt-10">
                <Link
                    to="/users"
                    className="text-blue-600 underline hover:text-blue-800 text-sm transition"
                >
                    View All Users →
                </Link>
            </div>
        </div>
    );
}

export default Home;
















