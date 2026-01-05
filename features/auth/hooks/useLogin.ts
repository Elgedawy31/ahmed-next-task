"use client";

import { useState } from "react";
import { loginUser } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";
import type { UseLoginReturn } from "../types";

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ email, password });

      if (!response.success || !response.data) {
        throw new Error(response.message || "Login failed");
      }

      const { user, accessToken } = response.data;

      if (!user || !accessToken) {
        throw new Error("Invalid response from server");
      }

      setAuth(accessToken, user);
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
