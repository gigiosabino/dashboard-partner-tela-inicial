
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { useState } from "react";

// Dados mockados dos usuários com perfis atualizados
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    perfis: ["Manager", "Basic"]
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@empresa.com",
    perfis: ["Master"]
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    perfis: ["Basic", "Import"]
  },
  {
    id: 4,
    nome: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    perfis: ["Auditoria"]
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@empresa.com",
    perfis: ["Vendedor", "Report"]
  }
];

export function GestaoAcessosContent() {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsuarios = usuarios.filter(usuario => 
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.perfis.some(perfil => perfil.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Acessos</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Usuários do Portal
            </CardTitle>
            <div className="flex items-center gap-4">
              <Button onClick={handleNovoUsuario} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Novo Usuário
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email ou perfil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
          </div>
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
                {filteredUsuarios.map((usuario) => (
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
