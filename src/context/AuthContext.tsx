'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthState {
  userEmail: string | null;
  isLoggedIn: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    userEmail: null,
    isLoggedIn: false
  });

  const login = (email: string) => {
    setAuth({
      userEmail: email,
      isLoggedIn: true
    });
    // Save to localStorage for persistence
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setAuth({
      userEmail: null,
      isLoggedIn: false
    });
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}