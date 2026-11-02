"use client";

import { createContext, useContext, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface AuthContextType {
  user: typeof authClient.$Infer.Session.user | null;
  isPending: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isPending,
        isAuthenticated: !!session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
