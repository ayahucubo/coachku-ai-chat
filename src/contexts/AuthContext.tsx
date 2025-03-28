
import React, { createContext, useState, useEffect } from 'react';

type User = {
  userId: string;
  sessionId: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('coachku_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('coachku_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (idToken: string) => {
    try {
      setIsLoading(true);
      // Send the idToken to backend for validation
      const response = await fetch('http://localhost:5678/webhook-test/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const userData = {
        userId: data.userId,
        sessionId: data.sessionId,
      };

      // Save user data to localStorage
      localStorage.setItem('coachku_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      if (user?.userId) {
        // Send request to backend to invalidate session
        await fetch('http://localhost:5678/webhook-test/signout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.userId }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user data from localStorage and state
      localStorage.removeItem('coachku_user');
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
