// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { AppToaster } from '@/components/ui/Toaster';

export const metadata: Metadata = {
  title: 'Inventory System',
  description: 'Sistema de estoque e inventário',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <AppToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
