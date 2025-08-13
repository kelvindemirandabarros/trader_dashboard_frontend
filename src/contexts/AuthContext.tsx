'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { useRouter } from 'next/navigation';

// Services:
import api from '@/services/api';

// Consts:
import { public_paths, storage_user_string } from '@/consts/App';

// Interfaces:
import { UserLoggedIn } from '../../types/User';

interface AuthContextType {
  user: UserLoggedIn | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserLoggedIn | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem(storage_user_string);

    try {
      const user_json = user ? JSON.parse(user) : '';

      const current_path = window.location.pathname;

      if (!user_json && !public_paths.includes(current_path)) {
        setIsLoading(false);
        router.push('/login');
      }

      setIsLoading(false);
      setUser(user_json);

      router.refresh();
    } catch (error) {
      console.log('Não foi possível carregar o usuário do local storage.');
      console.error(error);

      router.push('/login');
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const login_response = await api.post('/login', {
        email: email,
        password: password
      });

      const new_user: UserLoggedIn = login_response.data.user;

      localStorage.setItem(storage_user_string, JSON.stringify(new_user));

      setUser(new_user);

      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(storage_user_string);
    setUser(null);

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
