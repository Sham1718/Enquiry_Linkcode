import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authService } from "../services/admin/authService";
import { registerUnauthorizedHandler, toApiError, ApiError } from "../services/api";
import type { LoginResponse } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isReady: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      authService.logout();
      setIsAuthenticated(false);
    });
    setIsReady(true);
  }, []);

  const login = useCallback(async (usernameOrEmail: string, password: string) => {
    setError(null);
    try {
      // Backend expects { username, password }
      const res = await authService.login({ username: usernameOrEmail, password });
      setIsAuthenticated(true);
      return res;
    } catch (err) {
      const e = toApiError(err, "Login failed");
      const msg =
        e.status === 401
          ? "Invalid credentials. Please try again."
          : e.status === 0
          ? "Network error. Is the backend running?"
          : e.message;
      setError(msg);
      throw new ApiError(msg, e.status);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isReady, login, logout, error, clearError: () => setError(null) }),
    [isAuthenticated, isReady, login, logout, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
