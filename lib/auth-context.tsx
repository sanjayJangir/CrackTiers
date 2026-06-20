"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/data/types";

const STORAGE_KEY = "cracktiers_user";

export type ProfileUpdate = Partial<
  Pick<User, "name" | "email" | "phone" | "targetExam" | "city" | "state">
>;

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  updateProfile: (updates: ProfileUpdate) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as User);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((next: User | null) => {
    setUser(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    (email: string, _password: string) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const existing = JSON.parse(stored) as User;
          if (existing.email.toLowerCase() === email.toLowerCase()) {
            persistUser(existing);
            return true;
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }

      const demoUser: User = {
        id: "user-demo",
        name: email.split("@")[0] || "Student",
        email,
        joinedAt: new Date().toISOString(),
      };
      persistUser(demoUser);
      return true;
    },
    [persistUser]
  );

  const register = useCallback(
    (name: string, email: string, _password: string) => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        joinedAt: new Date().toISOString(),
      };
      persistUser(newUser);
      return true;
    },
    [persistUser]
  );

  const updateProfile = useCallback(
    (updates: ProfileUpdate) => {
      if (!user) return false;

      const name = updates.name?.trim();
      const email = updates.email?.trim().toLowerCase();

      if (name !== undefined && name.length < 2) return false;
      if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
      }

      const next: User = {
        ...user,
        ...updates,
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(updates.phone !== undefined
          ? { phone: updates.phone.trim() || undefined }
          : {}),
        ...(updates.city !== undefined
          ? { city: updates.city.trim() || undefined }
          : {}),
        ...(updates.state !== undefined
          ? { state: updates.state.trim() || undefined }
          : {}),
        ...(updates.targetExam !== undefined
          ? { targetExam: updates.targetExam || undefined }
          : {}),
      };

      persistUser(next);
      return true;
    },
    [persistUser, user]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
