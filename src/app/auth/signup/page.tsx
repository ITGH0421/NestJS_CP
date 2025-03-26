"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      // Simulate API call - Replace with actual backend logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Signup successful:", data);
      router.push("/auth/login"); // Redirect to login after signup
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-700">
          Already have an account? <a href="/auth/login" className="text-green-500 hover:text-blue-800 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}