'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(undefined);

const SESSION_KEY = 'safeher_session_user';
const REGISTRY_KEY = 'safeher_registered_users';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Hydrate session from localStorage on first mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to read auth session from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Mock login — accepts any email/password combination, creates a fake
   * session, persists it to localStorage, and redirects home.
   */
  const login = (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    let fullName = email.split('@')[0];

    // If this email was previously "registered" in this browser, reuse that name
    try {
      const registry = JSON.parse(window.localStorage.getItem(REGISTRY_KEY) || '[]');
      const match = registry.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
      if (match?.fullName) fullName = match.fullName;
    } catch (error) {
      console.error('Failed to read registered users:', error);
    }

    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      fullName,
      loggedInAt: new Date().toISOString(),
    };

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    router.push('/');
    return mockUser;
  };

  /**
   * Mock register — stores the submitted profile in a local "registry" so a
   * subsequent login can pick up the name, then sends the user to /login.
   */
  const register = (data) => {
    const { fullName, email, phone } = data;

    if (!fullName || !email || !phone) {
      throw new Error('Full name, email, and phone number are required.');
    }

    const newRecord = {
      id: `user_${Date.now()}`,
      fullName,
      email,
      phone,
      registeredAt: new Date().toISOString(),
    };

    try {
      const registry = JSON.parse(window.localStorage.getItem(REGISTRY_KEY) || '[]');
      registry.push(newRecord);
      window.localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
    } catch (error) {
      console.error('Failed to persist registered user:', error);
    }

    router.push('/login');
    return newRecord;
  };

  /** Clears the mock session and returns to the login screen. */
  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.push('/login');
  };

  const value = { user, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}