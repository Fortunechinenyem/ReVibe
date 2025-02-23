import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserRole(uid) {
  if (!uid) return null;

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().role || "user"; // Default role: "user"
    } else {
      return "user"; // Return default if no role exists
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return "user"; // Fallback role
  }
}

export const login = async (email, password) => {
  // Add API call to authenticate user
  return { success: true, user: { name: "John Doe", email } };
};

export const logout = async () => {
  // Add API call to log out user
  return { success: true };
};
