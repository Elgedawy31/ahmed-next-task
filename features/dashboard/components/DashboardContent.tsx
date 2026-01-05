"use client";

import { useEffect } from "react";
import { User } from "@/features/auth/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { toast } from "sonner";
import { LogOut, Loader } from "lucide-react";

interface DashboardContentProps {
  user: User | null;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const { logout, loading, error } = useLogout();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      // Error is handled by toast in useEffect
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg">
            Welcome,{" "}
            <span className="font-semibold">{user?.name || "User"}</span>
          </p>
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="outline"
            className="w-full cursor-pointer"
            size="lg"
          >
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
