import React, { createContext, useContext, useState, ReactNode } from "react";
import type { UserRole } from "./mock-data";

interface User {
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, User> = {
  student: { name: "Rahul Sharma", role: "student", email: "rahul@campus.edu" },
  staff: { name: "Vijay Kumar", role: "staff", email: "vijay@campus.edu" },
  admin: { name: "Dr. Anitha Roy", role: "admin", email: "admin@campus.edu" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
