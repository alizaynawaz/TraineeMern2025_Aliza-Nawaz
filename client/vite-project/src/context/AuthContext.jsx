import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (userData) => {
        try {

            const freshUser = userData; // abhi ke liye direct
            setUser(freshUser);
            localStorage.setItem("user", JSON.stringify(freshUser));
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear(); // purani sari info clear
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

