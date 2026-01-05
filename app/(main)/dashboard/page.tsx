"use client";

import { useState, useEffect } from "react";
import DashboardContent from "@/features/dashboard/components/DashboardContent";
import { useAuthStore } from "@/features/auth/stores/authStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid hydration mismatch
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return <DashboardContent user={user} />;
}
