import { Logo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { registerUser } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { addUserToFirestore } from "@/lib/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

function Login({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      console.log("User successfully logged in:", user);
      router.push("/profile");
    } catch (error) {
      console.error("Error during login:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-purple-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function Signup({ onClose, onSwitchToLogin }) {
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

      router.push("/profile");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-purple-600 hover:underline"
          >
            Login
          </button>
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();
  const { cart } = useCart();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-900">
          <Image src={Logo} width={90} height={90} alt="Logo" priority />
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-indigo-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/cart"
            className="relative text-indigo-900 hover:text-purple-600 transition duration-300"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-indigo-900 hover:text-purple-600 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden mt-7 bg-white px-6 py-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-center">
          <Link
            href="/cart"
            className="relative inline-block  text-indigo-900 hover:text-purple-600 transition duration-300"
          >
            <ShoppingCart size={24} className=" w-6 h-6 md:w-8 md:h-8" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 sm:-top-5 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {user ? (
          <>
            <Link
              href="/profile"
              className="block text-indigo-900 hover:text-purple-600 py-2 transition duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg text-center hover:bg-red-500 transition duration-300 transform hover:scale-105 shadow-lg mt-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="max-w-xs  w-auto bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-500 transition duration-300 transform hover:scale-105 shadow-lg mt-2 mx-auto block"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="max-w-xs w-auto  bg-green-600 text-white px-6 py-2 rounded-lg text-center hover:bg-green-500 transition duration-300 transform hover:scale-105 shadow-lg mt-2 mx-auto block"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </nav>
  );
}
