"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        // console.log(res);
        if (!res.ok) throw new Error();
        const userData = await res.json();
        // console.log(userData);
        setUser(userData);
      } catch (error) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = {
    user,
    loading,
    setUser,
    logout: async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/auth/login");
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
