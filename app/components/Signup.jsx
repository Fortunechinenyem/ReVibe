import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";

import { registerUser } from "@/lib/firebase";
import { addUserToFirestore } from "@/lib/firestore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await registerUser(email, password, name);
      const user = userCredential.user;

      await addUserToFirestore(user);
      await updateProfile(user, { displayName: name });

      console.log("User successfully signed up and added to Firestore!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-300 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h1>

        {error && (
          <p className="text-red-500 text-center bg-red-100 border border-red-200 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
