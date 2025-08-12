// src/pages/Login.jsx
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); //  use context here

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", data);
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            login(user); // 👈 update global user state

            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("Login failed! " + (error.response?.data?.message || "Try again."));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">

                {/* Left Side Welcome */}
                <div className="hidden md:flex flex-col items-center justify-center bg-blue-500 text-white p-8">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-center max-w-xs">
                        Please login to continue and manage your account.
                    </p>
                </div>

                {/* Right Side Form */}
                <div className="p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login to Your Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <Input
                                placeholder="Email"
                                {...register("email")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                        >
                            Log In
                        </Button>

                        <p className="text-sm text-center mt-4 text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;








