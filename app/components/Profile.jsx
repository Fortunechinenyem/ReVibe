import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export default function ProfileComponent({ user }) {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 relative">
            <Image
              src={photoURL || "/default-avatar.jpg"}
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {displayName || "Anonymous"}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Update Profile</h2>
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a photo URL"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* Additional Profile Information */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Account Details</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Account Created:</span>{" "}
              {new Date(user?.metadata.creationTime).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Last Sign-In:</span>{" "}
              {new Date(user?.metadata.lastSignInTime).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={async () => {
              await auth.signOut();
              router.push("/login");
            }}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
