'use client';

import { useManageUsers } from '@/app/manager-users/useManageUsers';
import { UserRole } from '@/types/models/User';
import { Trash2, KeyRound, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function ManageUsersPage() {
  const {
    users,
    newUser,
    setNewUser,
    handleCreate,
    handleDelete,
    handlePasswordReset,
    handleRoleChange,
    handleUpdateRole,
  } = useManageUsers();

  const [passwordInputs, setPasswordInputs] = useState<Record<number, string>>(
    {},
  );

  const roles: { label: string; value: UserRole }[] = [
    { label: 'Administrador', value: UserRole.Admin },
    { label: 'Editor', value: UserRole.Editor },
    { label: 'Visualizador', value: UserRole.Viewer },
    { label: 'Vendedor', value: UserRole.Seller },
    { label: 'Super Admin', value: UserRole.SuperAdmin },
  ];

  const handlePasswordChange = (userId: number, value: string) => {
    setPasswordInputs((prev) => ({ ...prev, [userId]: value }));
  };

  const handlePasswordSave = (userId: number) => {
    const newPassword = passwordInputs[userId];
    if (!newPassword) return;
    handlePasswordReset(userId, newPassword);
    setPasswordInputs((prev) => ({ ...prev, [userId]: '' }));
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">
        Gerenciar Usuários
      </h1>

      {/* Formulário de Criação */}
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Usuário"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="flex-1 min-w-[200px]"
            />
            <Input
              placeholder="Senha"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="flex-1 min-w-[200px]"
            />
            <Select
              value={newUser.role}
              onValueChange={(value) =>
                setNewUser({ ...newUser, role: value as UserRole })
              }
            >
              <SelectTrigger className="flex-1 min-w-[200px]">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleCreate} className="w-full sm:w-auto">
              Criar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Versão desktop com tabela */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nova Senha</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value as UserRole)
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r.value} value={r.value}>
                                {r.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={() => handleUpdateRole(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar alteração de cargo"
                        >
                          <CheckCircle size={18} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Nova senha"
                          type="password"
                          value={passwordInputs[user.id] || ''}
                          onChange={(e) =>
                            handlePasswordChange(user.id, e.target.value)
                          }
                          className="w-[140px]"
                        />
                        <Button
                          onClick={() => handlePasswordSave(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar nova senha"
                        >
                          <KeyRound size={16} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.created_at?.slice(0, 19).replace('T', ' ')}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="destructive"
                        size="icon"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Versão mobile em cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-base">
                Usuário: <strong>{user.username}</strong>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">ID: {user.id}</p>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Cargo:</label>
                <div className="flex items-center gap-2">
                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      handleRoleChange(user.id, value as UserRole)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleUpdateRole(user.id)}
                    variant="outline"
                    size="icon"
                  >
                    <CheckCircle size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  Nova Senha:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="password"
                    placeholder="Nova senha"
                    value={passwordInputs[user.id] || ''}
                    onChange={(e) =>
                      handlePasswordChange(user.id, e.target.value)
                    }
                  />
                  <Button
                    onClick={() => handlePasswordSave(user.id)}
                    variant="outline"
                    size="icon"
                  >
                    <KeyRound size={16} />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Criado em:{' '}
                <span className="font-medium">
                  {user.created_at?.slice(0, 19).replace('T', ' ')}
                </span>
              </p>

              <Button
                onClick={() => handleDelete(user.id)}
                variant="destructive"
                className="w-full"
              >
                <Trash2 size={16} className="mr-2" />
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
