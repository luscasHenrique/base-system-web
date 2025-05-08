'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { fakeLoginRequest } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await fakeLoginRequest({ email, password });

      toast.success(`Bem-vindo(a), ${response.user.name}!`);

      login(
        response.token,
        response.user.role,
        response.user.name,
        response.user.email,
      );

      router.push('/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao realizar login.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
