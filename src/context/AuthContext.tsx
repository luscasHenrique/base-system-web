'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { logout as logoutService, fetchUserInfo } from '@/lib/auth';
import { UserRole } from '@/types/models/User';
import { usePathname, useRouter } from 'next/navigation';
import { hasAccess } from '@/lib/accessControl';
import { toast } from 'react-hot-toast';

interface AuthContextProps {
  isLoggedIn: boolean;
  userRole: UserRole;
  userName: string | null;
  userEmail: string | null;
  login: (token: string, role: UserRole, name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Viewer);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  const loadUserInfo = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    try {
      const user = await fetchUserInfo();
      setIsLoggedIn(true);
      setUserRole(user.role);
      setUserName(user.name);
      setUserEmail(user.email);

      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      logoutService();
      setIsLoggedIn(false);
      setUserRole(UserRole.Viewer);
      setUserName(null);
      setUserEmail(null);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn && pathname !== '/login') {
      router.replace('/login');
    } else if (
      isLoggedIn &&
      !hasAccess(pathname, userRole) &&
      pathname !== '/'
    ) {
      toast.error('Acesso Negado');
      router.replace('/');
    }
  }, [isLoggedIn, userRole, pathname, router, isLoading]);

  const login = (
    token: string,
    role: UserRole,
    name: string,
    email: string,
  ) => {
    // Cookies (acessíveis no middleware)
    Cookies.set('token', token, { path: '/' });
    Cookies.set('userRole', role, { path: '/' });

    // localStorage (para a UI)
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    // Atualiza o estado global
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  };

  const logout = () => {
    // Remove cookies
    Cookies.remove('token');
    Cookies.remove('userRole');

    // Remove localStorage
    logoutService();
    setIsLoggedIn(false);
    setUserRole(UserRole.Viewer);
    setUserName(null);
    setUserEmail(null);

    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userName,
        userEmail,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
