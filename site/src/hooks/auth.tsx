import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: number;
  nome: string;
  login: string;
  perfil: string;
  ativo?: boolean;
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
}

interface SignInCredentials {
  login: string;
  senha: string;
}

interface AuthContextData {
  user: User | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@Barbearia:user';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { user: JSON.parse(stored) };
      } catch (_) {}
    }
    return { user: null };
  });

  const signIn = useCallback(async ({ login, senha }: SignInCredentials) => {
    const response = await api.post('auth/login', {
      login: login.trim(),
      senha,
    });
    const user = response.data as User;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData({ user: null } as unknown as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setData((prev) => ({ ...prev, user }));
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };
