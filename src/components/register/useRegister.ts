'use client';

import { UserRole } from '@/types/models/User';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log({ username, password, role }); // Simulação de registro
      toast.success('Usuário registrado com sucesso!');
    } catch (error) {
      toast.error('Erro ao registrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    handleSubmit,
    loading,
  };
}
