"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useVerify } from "../hooks/useVerify";
import { verifySchema, type VerifyFormData } from "../schemas/verify.schema";

export default function VerifyForm() {
  const {
    verify,
    resendCode,
    loading,
    resendLoading,
    error: hookError,
    resendError,
    resendSuccess,
  } = useVerify();
  const [countdown, setCountdown] = useState(0);
  const prevResendSuccessRef = React.useRef(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (hookError) {
      toast.error(hookError);
    }
  }, [hookError]);

  useEffect(() => {
    if (resendError) {
      toast.error(resendError);
    }
  }, [resendError]);

  useEffect(() => {
    if (resendSuccess && !prevResendSuccessRef.current) {
      toast.success("Verification code sent successfully!");
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setCountdown(60); // 60 seconds = 1 minute
      }, 0);
      prevResendSuccessRef.current = true;
      return () => clearTimeout(timer);
    } else if (!resendSuccess) {
      prevResendSuccessRef.current = false;
    }
  }, [resendSuccess]);

  const handleResendCode = async () => {
    await resendCode();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyFormData) => {
    try {
      await verify(data.code);
      toast.success("Account verified successfully");
    } catch {
      // Error is handled by hookError and shown via toast
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div>
        <h1 className="text-center text-2xl font-bold">Verify Your Account</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Enter the verification code sent to your email or phone
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label>
            Verification Code
            <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="code"
            control={control}
            render={({ field: { value, onChange } }) => (
              <OTPInput
                value={value}
                onChange={onChange}
                numInputs={6}
                renderSeparator={<span className="mx-1">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    disabled={loading}
                    inputMode="numeric"
                    className="w-12! h-12! rounded-md border border-input bg-background text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                )}
                inputType="text"
                shouldAutoFocus
                containerStyle="flex justify-center gap-2"
              />
            )}
          />
          {errors.code && (
            <p
              id="code-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.code.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <div className="space-y-2 text-center text-sm">
        <div>
          <span className="text-muted-foreground">
            Didn&apos;t receive a code?{" "}
          </span>
          <Button
            type="button"
            onClick={handleResendCode}
            disabled={resendLoading || countdown > 0}
            variant="link"
            className="p-0 h-auto font-medium"
          >
            {resendLoading
              ? "Sending..."
              : countdown > 0
              ? `Resend Code (${countdown}s)`
              : "Resend Code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
