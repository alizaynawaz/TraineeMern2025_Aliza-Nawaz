import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Context import

// Validation Schema
const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    age: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Enter a valid age",
        }),
    gender: z.string().min(1, "Gender is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function Signup() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // ✅ use login from context

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", data);
            const { token, user } = res.data;

            // ✅ Store token and update user context
            localStorage.setItem("token", token);
            login(user); // ✅ this updates global state

            alert("Signup successful!");
            navigate("/"); // redirect to home or profile
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert("Signup failed! " + (error.response?.data?.message || "Try again."));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Left side image/message */}
                <div className="hidden md:flex flex-col items-center justify-center bg-blue-500 text-white p-8">
                    <h2 className="text-3xl font-bold mb-2">Join Us Today!</h2>
                    <p className="text-center max-w-xs">
                        Create your account and start exploring.
                    </p>
                </div>

                {/* Right side form */}
                <div className="p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Create an Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Name */}
                        <div>
                            <Input
                                placeholder="Name"
                                {...register("name")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Input
                                placeholder="Email"
                                {...register("email")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Age */}
                        <div>
                            <Input
                                placeholder="Age"
                                {...register("age")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <Input
                                placeholder="Gender"
                                {...register("gender")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                        >
                            Sign Up
                        </Button>

                        {/* Link to login */}
                        <p className="text-sm text-center mt-4 text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 underline font-medium">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;








