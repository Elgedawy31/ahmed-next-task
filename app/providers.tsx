"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { getQueryClient } from "@/utils/queryClient";
import { Toaster } from "@/components/ui/sonner";

const queryClient = getQueryClient();

// Core providers that don't need auth data - used globally
export function CoreProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
