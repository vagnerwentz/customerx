import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  admin: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  admin: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Customer:token');
    const admin = localStorage.getItem('@Customer:admin');

    if (token && admin) {
      return { token, admin: JSON.parse(admin) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, admin } = response.data;

    localStorage.setItem('@Customer:token', token);
    localStorage.setItem('@Customer:admin', JSON.stringify(admin));

    setData({ token, admin });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Customer:token');
    localStorage.removeItem('@Customer:admin');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ admin: data.admin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
