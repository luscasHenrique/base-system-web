// src/types/api.ts

/**
 * Requisição para login.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Resposta genérica da API em caso de sucesso.
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Estrutura para erros da API.
 */
export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Tipo genérico que pode ser tanto sucesso quanto erro.
 */
export type ApiResult<T> = ApiResponse<T> | ApiError;
