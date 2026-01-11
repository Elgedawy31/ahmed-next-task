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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: "971", country: "UAE" },
  { code: "1", country: "USA/Canada" },
  { code: "44", country: "UK" },
  { code: "966", country: "Saudi Arabia" },
  { code: "965", country: "Kuwait" },
  { code: "974", country: "Qatar" },
  { code: "973", country: "Bahrain" },
  { code: "968", country: "Oman" },
  { code: "20", country: "Egypt" },
  { code: "33", country: "France" },
  { code: "49", country: "Germany" },
  { code: "39", country: "Italy" },
  { code: "34", country: "Spain" },
  { code: "61", country: "Australia" },
  { code: "81", country: "Japan" },
  { code: "86", country: "China" },
  { code: "91", country: "India" },
];

export default function RegisterForm() {
  const { register: registerUser, loading, error: hookError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      mobile_country_code: "971",
    },
  });

  const selectedCountryCode = watch("mobile_country_code");

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

        <div className="space-y-2">
          <Label htmlFor="mobile">
            Mobile Number
            <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Select
              value={selectedCountryCode}
              onValueChange={(value) => setValue("mobile_country_code", value)}
              disabled={loading}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    +{country.code} ({country.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                disabled={loading}
                required
                aria-invalid={errors.mobile ? "true" : "false"}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
                className={errors.mobile ? "border-destructive" : ""}
                {...register("mobile")}
              />
            </div>
          </div>
          {errors.mobile_country_code && (
            <p className="text-sm text-destructive" role="alert">
              {errors.mobile_country_code.message}
            </p>
          )}
          {errors.mobile && (
            <p
              id="mobile-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.mobile.message}
            </p>
          )}
        </div>

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
              aria-describedby={errors.password ? "password-error" : "password-hint"}
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
          {!errors.password && (
            <p id="password-hint" className="text-xs text-muted-foreground">
              Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and include @ symbol
            </p>
          )}
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
