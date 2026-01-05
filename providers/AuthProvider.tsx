"use client";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { User } from "@/features/auth/types/";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({
  token,
  user,
  children,
}: {
  token: string | null;
  user: User | null;
  children: ReactNode;
}) {
  const { setUser, setToken } = useAuthStore((state) => state);

  useEffect(() => {
    // Set token if available (can be used later even without user)
    if (token) {
      setToken(token);
    }
    // Set user if available
    if (user) {
      setUser(user);
    }
  }, [token, user, setUser, setToken]);

  return <>{children}</>;
}
