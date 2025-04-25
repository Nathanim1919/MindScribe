import { User } from 'better-auth/types';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { authClient } from '../lib/authClient';

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (credentials: { email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Intialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const persistedUser = await authClient.getSession();
        if (persistedUser) {
          setUser(persistedUser.data?.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        setError('Failed to initialize authentication state');
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const signIn = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call your better-auth signIn method here
      const authResult = await authClient.signIn.email(credentials);
      console.log("Auth-Response is: ", authResult);
      setUser(authResult.data?.user ?? undefined);
      // persistAuth(authResult);
    } catch (err) {
      setError(err.message);
      console.error('Error signing in:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: {
    email: string;
    name: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call your better-auth signIn method here
      const authResult = await authClient.signUp.email(credentials);
      setUser(authResult.data?.user ?? undefined);
      // persistAuth(authResult);
    } catch (err) {
      setError(err.message);
      console.error('Error signing in:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      setUser(undefined);
      // clearPersistedAuth();
    } catch (err) {
      setError(err.message);
      console.error('Error signing out:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      error,
      signIn,
      signOut,
      signUp,
    }),
    [isAuthenticated, user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
