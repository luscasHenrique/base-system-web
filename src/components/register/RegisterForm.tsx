'use client';

import { useRegister } from './useRegister';
import Link from 'next/link';
import { UserRole } from '@/types/models/User';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function RegisterForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    handleSubmit,
    loading,
  } = useRegister();

  const roles: { label: string; value: UserRole }[] = [
    { label: 'Visualizador', value: UserRole.Viewer },
    { label: 'Editor', value: UserRole.Editor },
    { label: 'Administrador', value: UserRole.Admin },
    { label: 'Vendedor', value: UserRole.Seller },
    { label: 'Super Admin', value: UserRole.SuperAdmin },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Registrar Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Usuário:
              </label>
              <Input
                id="username"
                placeholder="Digite o nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha:
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cargo:
              </label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>

            <div className="text-center mt-4">
              <Link href="/" className="text-sm text-blue-500 hover:underline">
                Voltar para a página inicial.
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
