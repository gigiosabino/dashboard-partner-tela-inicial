
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";

// Dados mockados dos usuários
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    perfis: ["Administrador", "Consulta"]
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@empresa.com",
    perfis: ["Operador"]
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    perfis: ["Consulta"]
  },
  {
    id: 4,
    nome: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    perfis: ["Administrador"]
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@empresa.com",
    perfis: ["Operador", "Consulta"]
  }
];

export function GestaoAcessosContent() {
  const handleEditarUsuario = (id: number) => {
    console.log('Editar usuário:', id);
    // Aqui seria implementada a lógica de edição
  };

  const handleExcluirUsuario = (id: number) => {
    console.log('Excluir usuário:', id);
    // Aqui seria implementada a lógica de exclusão
  };

  const handleNovoUsuario = () => {
    console.log('Novo usuário');
    // Aqui seria implementada a lógica para adicionar novo usuário
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Acessos</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">
            Usuários do Portal
          </CardTitle>
          <Button onClick={handleNovoUsuario} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Usuário
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfis de Acesso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nome}
                    </TableCell>
                    <TableCell>
                      {usuario.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {usuario.perfis.map((perfil, index) => (
                          <Badge key={index} variant="secondary">
                            {perfil}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditarUsuario(usuario.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleExcluirUsuario(usuario.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
