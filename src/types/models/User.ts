// src/types/models/user.ts

// Tipos possíveis de papel (role) de um usuário
export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
  Seller = 'seller',
  SuperAdmin = 'superAdmin',
}

// Interface principal de um usuário
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole; // agora usando o enum
  is_active: boolean;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Interface da resposta de login, contendo o token e os dados do usuário
export interface LoginResponse {
  token: string;
  user: User;
}
