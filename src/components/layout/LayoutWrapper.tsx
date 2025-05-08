'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from './header/Header';
import { NavMenu } from './navmenu/NavMenu';
import { useAuth } from '@/context/AuthContext';
import { hasAccess } from '@/lib/accessControl';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, userRole, isLoading } = useAuth();

  const isLoginPage = pathname === '/login';
  const [checked, setChecked] = useState(false);

  // 🔥 Reset do checked sempre que alguma dessas dependências mudar
  useEffect(() => {
    setChecked(false); // Reset para garantir nova checagem a cada navegação
  }, [pathname, isLoggedIn, userRole]);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn && !isLoginPage) {
      router.replace('/login');
    } else if (isLoggedIn && !hasAccess(pathname, userRole)) {
      toast.error('Acesso Negado');
      router.replace('/');
    } else {
      setChecked(true); // Libera o render quando tudo estiver correto
    }
  }, [isLoggedIn, userRole, pathname, router, isLoginPage, isLoading]);

  // 🔒 Se ainda está carregando OU ainda não checou o acesso, exibe o loading
  if (isLoading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  // Layout da página de login
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {children}
      </div>
    );
  }

  // Layout padrão (usuário logado e autorizado)
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="hidden md:flex p-1">
        <NavMenu />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
