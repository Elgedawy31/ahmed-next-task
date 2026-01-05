"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { useRegister } from "../hooks/useRegister";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const { register: registerUser, loading, error: hookError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (hookError) {
      toast.error(hookError);
    }
  }, [hookError]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        password_confirmation: data.password_confirmation,
        mobile_country_code: data.mobile_country_code,
        type: "client", // Default value
        fcm_token: data.fcm_token || "test",
      });
      toast.success("Account created successfully");
    } catch {
      // Error is handled by hookError and shown via toast
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div>
        <h1 className="text-center text-2xl font-bold">Create New Account</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Register a new account to start shopping
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          error={errors.name}
          disabled={loading}
          required
          register={register("name")}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          error={errors.email}
          disabled={loading}
          required
          register={register("email")}
        />

        <FormField
          label="Mobile Country Code"
          name="mobile_country_code"
          type="text"
          placeholder="971"
          error={errors.mobile_country_code}
          disabled={loading}
          required
          register={register("mobile_country_code")}
        />

        <FormField
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          error={errors.mobile}
          disabled={loading}
          required
          register={register("mobile")}
        />

        <div className="space-y-2">
          <Label htmlFor="password">
            Password
            <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={loading}
              required
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p
              id="password-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation">
            Confirm Password
            <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              disabled={loading}
              required
              aria-invalid={errors.password_confirmation ? "true" : "false"}
              aria-describedby={
                errors.password_confirmation
                  ? "password_confirmation-error"
                  : undefined
              }
              className="pr-10"
              {...register("password_confirmation")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <p
              id="password_confirmation-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Account
        </Button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
