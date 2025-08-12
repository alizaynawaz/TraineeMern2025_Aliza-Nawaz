import { useEffect, useState } from "react";
import axios from "axios";
import { LayoutGrid, Table } from "lucide-react";

function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState("cards");
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("name-asc");
    const usersPerPage = 6;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("http://localhost:5000/api/auth/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUsers(res.data);
                setFilteredUsers(res.data);
            })
            .catch((err) => console.error("Fetch users error:", err));
    }, []);

    // Filter + Sort
    useEffect(() => {
        let filtered = [...users].filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );

        switch (sortOption) {
            case "name-asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "age-asc":
                filtered.sort((a, b) => (a.age || 0) - (b.age || 0));
                break;
            case "age-desc":
                filtered.sort((a, b) => (b.age || 0) - (a.age || 0));
                break;
            default:
                break;
        }

        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [search, sortOption, users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6 relative">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <h2 className="text-4xl font-bold text-blue-800 drop-shadow">All Users</h2>

                <div className="flex flex-wrap items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-3 py-2 border rounded shadow-sm focus:outline-none"
                    >
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                        <option value="age-asc">Age Low-High</option>
                        <option value="age-desc">Age High-Low</option>
                    </select>

                    <button
                        onClick={() => setViewMode("cards")}
                        className={`p-2 rounded hover:bg-blue-100 ${viewMode === "cards" ? "bg-blue-200" : ""}`}
                        title="Cards View"
                    >
                        <LayoutGrid className={`w-5 h-5 ${viewMode === "cards" ? "text-blue-600" : "text-gray-500"}`} />
                    </button>
                    <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded hover:bg-blue-100 ${viewMode === "table" ? "bg-blue-200" : ""}`}
                        title="Table View"
                    >
                        <Table className={`w-5 h-5 ${viewMode === "table" ? "text-blue-600" : "text-gray-500"}`} />
                    </button>
                </div>
            </div>

            {/* View */}
            {viewMode === "cards" ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl border-t-4 border-blue-400 transition-transform hover:scale-[1.03] min-h-[220px]"
                        >
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <img
                                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-full object-cover border"
                                />
                                <h3 className="font-semibold text-lg text-blue-900">{user.name}</h3>
                                <p className="text-gray-600 text-sm text-center">{user.email}</p>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1 text-center">
                                <p>Age: {user.age || "N/A"}</p>
                                <p>Gender: {user.gender || "N/A"}</p>
                                <p>Provider: {user.provider || "Credentials"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold mb-4 text-blue-800">User Table</h3>
                    <div className="overflow-x-auto mb-12 rounded-lg border border-blue-200 shadow-sm">
                        <table className="min-w-full border-collapse text-sm text-left">
                            <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Age</th>
                                    <th className="px-4 py-3">Gender</th>
                                    <th className="px-4 py-3">Provider</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-blue-50 transition-colors cursor-pointer`}
                                    >
                                        <td className="px-4 py-3 flex items-center gap-3">
                                            <img
                                                src={
                                                    user.image ||
                                                    `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&rounded=true&size=40`
                                                }
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover border border-blue-300"
                                            />
                                            <span className="font-medium text-blue-900">{user.name}</span>
                                        </td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{user.age || "N/A"}</td>
                                        <td className="px-4 py-3">{user.gender || "N/A"}</td>
                                        <td className="px-4 py-3">{user.provider || "Credentials"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Pagination */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-blue-800 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Users;







