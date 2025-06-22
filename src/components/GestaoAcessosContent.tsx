
import { GlobalHeader } from "@/components/GlobalHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Shield, User } from "lucide-react";
import { useState } from "react";
import { EditUserModal } from "./EditUserModal";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string | string[];
  status: string;
  ultimoAcesso: string;
}

export function GestaoAcessosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // Dados mockados para exemplo
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      perfil: ["Manager"],
      status: "Ativo",
      ultimoAcesso: "22/06/2025 14:30"
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      perfil: ["Basic"],
      status: "Ativo",
      ultimoAcesso: "22/06/2025 13:15"
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro.costa@email.com",
      perfil: ["Auditoria", "Manager"],
      status: "Inativo",
      ultimoAcesso: "20/06/2025 16:45"
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      perfil: ["Import", "Basic"],
      status: "Ativo",
      ultimoAcesso: "22/06/2025 15:20"
    }
  ]);

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "Ativo" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        Inativo
      </Badge>
    );
  };

  const getPerfilIcon = (perfil: string | string[]) => {
    const perfis = Array.isArray(perfil) ? perfil : [perfil];
    const hasHighPermission = perfis.some(p => p === "Manager" || p === "Import");
    return hasHighPermission ? (
      <Shield className="w-4 h-4 text-red-600" />
    ) : (
      <User className="w-4 h-4 text-blue-600" />
    );
  };

  const formatPerfis = (perfil: string | string[]) => {
    const perfis = Array.isArray(perfil) ? perfil : [perfil];
    return perfis.join(", ");
  };

  const handleEditUser = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setEditModalOpen(true);
  };

  const handleSaveUser = (updatedUsuario: Usuario) => {
    setUsuarios(usuarios.map(user => 
      user.id === updatedUsuario.id ? updatedUsuario : user
    ));
    console.log("Usuário atualizado:", updatedUsuario);
  };

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Gestão de Acessos" 
        subtitle="Gerencie usuários e permissões do sistema" 
      />

      <main className="p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Usuários do Sistema</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filtro de busca */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar usuários por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Lista de usuários */}
              <div className="space-y-3">
                {filteredUsuarios.map((usuario) => (
                  <div
                    key={usuario.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{usuario.nome}</h3>
                          {getPerfilIcon(usuario.perfil)}
                        </div>
                        <p className="text-sm text-gray-600">{usuario.email}</p>
                        <p className="text-xs text-gray-500">
                          Último acesso: {usuario.ultimoAcesso}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatPerfis(usuario.perfil)}</p>
                        {getStatusBadge(usuario.status)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditUser(usuario)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsuarios.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum usuário encontrado.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        usuario={selectedUsuario}
        onSave={handleSaveUser}
      />
    </div>
  );
}
