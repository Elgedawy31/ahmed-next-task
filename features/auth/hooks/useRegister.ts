"use client";

import { useState } from "react";
import { registerUser } from "../actions/auth.service";
import { useAuthStore } from "../stores/authStore";
import type { RegisterCredentials, UseRegisterReturn } from "../types";

export function useRegister(): UseRegisterReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (data: RegisterCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(data);

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      // Save auth if available
      if (response.data?.user && response.data?.accessToken) {
        setAuth(response.data.accessToken, response.data.user);
      }

      // Save verification data in sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingVerificationEmail", data.email);
        if (response.temp_token) {
          sessionStorage.setItem(
            "pendingVerificationToken",
            response.temp_token
          );
        }
      }

      window.location.href = "/verify";
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during registration";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
