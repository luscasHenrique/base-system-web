// src/lib/auth.ts

import { LoginResponse, User, UserRole } from '@/types/models/User';
import { LoginRequest } from '@/types/api';

export type Role = UserRole;

export async function fakeLoginRequest(
  request: LoginRequest,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { email, password } = request;

  if (email === 'admin@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-123456',
      user: {
        id: 1,
        username: 'admin',
        name: 'Administrador',
        email: 'admin@example.com',
        password: '123456',
        phone: '(11) 99999-0000',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
        role: UserRole.Admin,
        is_active: true,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
  } else if (email === 'editor@example.com' && password === '123456') {
    return {
      token: 'fake-jwt-token-654321',
      user: {
        id: 2,
        username: 'editor',
        name: 'Editor',
        email: 'editor@example.com',
        password: '123456',
        phone: null,
        avatar_url: null,
        role: UserRole.Editor,
        is_active: true,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
  } else {
    throw new Error('E-mail ou senha inválidos.');
  }
}

export async function fetchUserInfo(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = localStorage.getItem('userEmail');

  if (email === 'admin@example.com') {
    return {
      id: 1,
      username: 'admin',
      name: 'Administrador',
      email: 'admin@example.com',
      password: '123456',
      phone: '(11) 99999-0000',
      avatar_url: 'https://i.pravatar.cc/150?img=1',
      role: UserRole.Admin,
      is_active: true,
      last_login: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else if (email === 'editor@example.com') {
    return {
      id: 2,
      username: 'editor',
      name: 'Editor',
      email: 'editor@example.com',
      password: '123456',
      phone: null,
      avatar_url: null,
      role: UserRole.Editor,
      is_active: true,
      last_login: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } else {
    throw new Error('Usuário não encontrado.');
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
}
