"use client";

import { useState } from "react";
import { verifyUser, resendVerificationCode } from "../actions/auth.service";
import type { UseVerifyReturn } from "../types";

export function useVerify(): UseVerifyReturn {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const verify = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await verifyUser({ code });
      if (!response.success) {
        throw new Error(response.message || "Verification failed");
      }
      // Don't save token or user during verification
      // Only save them after login

      // Redirect to login page after successful verification
      window.location.href = "/login";
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during verification";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResendLoading(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      // Get email and temp_token from sessionStorage if available
      const email =
        typeof window !== "undefined"
          ? sessionStorage.getItem("pendingVerificationEmail")
          : null;
      const tempToken =
        typeof window !== "undefined"
          ? sessionStorage.getItem("pendingVerificationToken")
          : null;

      const response = await resendVerificationCode(
        email || undefined,
        tempToken || undefined
      );
      if (!response.success) {
        throw new Error(response.message || "Failed to resend code");
      }
      setResendSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while resending code";
      setResendError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return {
    verify,
    resendCode,
    loading,
    resendLoading,
    error,
    resendError,
    resendSuccess,
  };
}
