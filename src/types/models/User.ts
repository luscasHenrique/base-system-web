export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
  Seller = 'seller',
  SuperAdmin = 'superAdmin',
}

export interface User {
  id: string;
  username?: string | null;
  name: string;
  email: string;
  password_hash: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  is_active: boolean;
  last_login_at?: string | null;
  created_at: string;
  updated_at?: string | null;

  // extras do banco (opcional incluir na model agora)
  metadata?: Record<string, unknown> | null;
  deleted_at?: string | null;
  auth_provider?: string | null;
  email_verified?: boolean;
  verification_token?: string | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}
