"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const { login, loading, error: hookError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (hookError) {
      toast.error(hookError);
    }
  }, [hookError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully");
    } catch {
      // Error is handled by hookError and shown via toast
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-sm">
      <div>
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to continue shopping
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
