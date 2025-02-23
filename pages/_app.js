// import { AuthProvider } from "@/context/AuthContext";
import { onAuthStateChangedListener } from "@/lib/auth";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Component {...pageProps} user={user} />
    // <AuthProvider>
    //   <Component {...pageProps} user={user} />
    // </AuthProvider>
  );
}
