// src/app/manager-users/useManageUsers.ts
'use client';

import { useState } from 'react';
import { User, UserRole } from '@/types/models/User';
import { toast } from 'react-hot-toast';

export function useManageUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: 'lunasjc@lunaaba.com.br',
      name: 'Luna Admin',
      email: 'lunasjc@lunaaba.com.br',
      password: '123456',
      role: UserRole.Admin,
      is_active: true,
      created_at: '2025-01-06T16:14:47Z',
      updated_at: null,
      last_login: null,
    },
    // outros usuários...
  ]);

  const [newUser, setNewUser] = useState<{
    username: string;
    password: string;
    role: UserRole;
  }>({
    username: '',
    password: '',
    role: UserRole.Viewer,
  });

  const handleCreate = () => {
    if (!newUser.username || !newUser.password) {
      toast.error('Preencha todos os campos!');
      return;
    }

    const newId = Math.max(...users.map((u) => u.id), 0) + 1;

    const user: User = {
      id: newId,
      username: newUser.username,
      name: newUser.username,
      email: `${newUser.username.toLowerCase()}@example.com`,
      password: newUser.password,
      role: newUser.role,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: null,
      last_login: null,
    };

    setUsers([...users, user]);
    setNewUser({ username: '', password: '', role: UserRole.Viewer });
    toast.success('Usuário criado com sucesso!');
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success('Usuário excluído');
  };

  const handlePasswordReset = (id: number, newPassword: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, password: newPassword } : u)),
    );
    toast.success(`Senha redefinida com sucesso!`);
  };

  const handleRoleChange = (id: number, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const handleUpdateRole = (id: number) => {
    toast.success(`Cargo do usuário #${id} atualizado`);
  };

  return {
    users,
    newUser,
    setNewUser,
    handleCreate,
    handleDelete,
    handlePasswordReset, // ✅ agora aceita (id, novaSenha)
    handleRoleChange,
    handleUpdateRole,
  };
}
