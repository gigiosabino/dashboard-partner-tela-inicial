import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, Search, X } from "lucide-react";
import { useState } from "react";

// Dados mockados dos usuários com perfis atualizados
const usuarios = [{
  id: 1,
  nome: "João Silva",
  email: "joao.silva@empresa.com",
  perfis: ["Manager", "Basic"]
}, {
  id: 2,
  nome: "Maria Santos",
  email: "maria.santos@empresa.com",
  perfis: ["Master"]
}, {
  id: 3,
  nome: "Pedro Costa",
  email: "pedro.costa@empresa.com",
  perfis: ["Basic", "Import"]
}, {
  id: 4,
  nome: "Ana Oliveira",
  email: "ana.oliveira@empresa.com",
  perfis: ["Auditoria"]
}, {
  id: 5,
  nome: "Carlos Ferreira",
  email: "carlos.ferreira@empresa.com",
  perfis: ["Vendedor", "Report"]
}];

// Perfis disponíveis
const perfisDisponiveis = ["Manager", "Basic", "Auditoria", "Import", "Master", "Vendedor", "Report"];

// Simulando o usuário logado - aqui seria obtido do contexto de autenticação
const usuarioLogado = {
  id: 1,
  nome: "João Silva",
  perfis: ["Manager"] // Pode ser alterado para "Master" para testar
};

// Função para obter perfis permitidos baseado no perfil do usuário criador
const getPerfisPermitidos = (perfilUsuario: string[]) => {
  if (perfilUsuario.includes("Manager")) {
    return ["Manager", "Basic", "Auditoria", "Import"];
  }
  if (perfilUsuario.includes("Master")) {
    return ["Master", "Vendedor", "Import", "Report"];
  }
  return [];
};
export function GestaoAcessosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<any>(null);
  const [nomeEditando, setNomeEditando] = useState("");
  const [perfisEditando, setPerfisEditando] = useState<string[]>([]);

  // Obter perfis permitidos para o usuário logado
  const perfisPermitidos = getPerfisPermitidos(usuarioLogado.perfis);
  const handleEditarUsuario = (id: number) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setUsuarioEditando(usuario);
      setNomeEditando(usuario.nome);
      setPerfisEditando([...usuario.perfis]);
      setIsEditModalOpen(true);
    }
  };
  const handleSalvarEdicao = () => {
    console.log('Salvando edição:', {
      id: usuarioEditando.id,
      nome: nomeEditando,
      perfis: perfisEditando
    });
    // Aqui seria implementada a lógica para salvar as alterações
    setIsEditModalOpen(false);
    setUsuarioEditando(null);
  };
  const handleFecharModal = () => {
    setIsEditModalOpen(false);
    setUsuarioEditando(null);
    setNomeEditando("");
    setPerfisEditando([]);
  };
  const handleAdicionarPerfil = (perfil: string) => {
    if (!perfisEditando.includes(perfil)) {
      setPerfisEditando([...perfisEditando, perfil]);
    }
  };
  const handleRemoverPerfil = (perfil: string) => {
    setPerfisEditando(perfisEditando.filter(p => p !== perfil));
  };
  const handleExcluirUsuario = (id: number) => {
    console.log('Excluir usuário:', id);
    // Aqui seria implementada a lógica de exclusão
  };
  const handleNovoUsuario = () => {
    console.log('Novo usuário');
    // Aqui seria implementada a lógica para adicionar novo usuário
  };
  const filteredUsuarios = usuarios.filter(usuario => usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) || usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) || usuario.perfis.some(perfil => perfil.toLowerCase().includes(searchTerm.toLowerCase())));
  return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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
              <Button onClick={handleNovoUsuario} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
                <Plus className="w-4 h-4" />
                Novo Usuário
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar por nome, email ou perfil..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-80" />
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
                {filteredUsuarios.map(usuario => <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nome}
                    </TableCell>
                    <TableCell>
                      {usuario.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {usuario.perfis.map((perfil, index) => <Badge key={index} variant="secondary">
                            {perfil}
                          </Badge>)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditarUsuario(usuario.id)} className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleExcluirUsuario(usuario.id)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={isEditModalOpen} onOpenChange={handleFecharModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nome" className="text-right text-sm font-medium">
                Nome
              </label>
              <Input id="nome" value={nomeEditando} onChange={e => setNomeEditando(e.target.value)} className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">
                Email
              </label>
              <div className="col-span-3 px-3 py-2 bg-gray-50 border rounded-md text-sm text-gray-600">
                {usuarioEditando?.email}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right text-sm font-medium mt-2">
                Perfis
              </label>
              <div className="col-span-3 space-y-3">
                <Select onValueChange={handleAdicionarPerfil}>
                  <SelectTrigger>
                    <SelectValue placeholder="Adicionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {perfisPermitidos.filter(perfil => !perfisEditando.includes(perfil)).map(perfil => <SelectItem key={perfil} value={perfil}>
                          {perfil}
                        </SelectItem>)}
                  </SelectContent>
                </Select>
                
                <div className="flex flex-wrap gap-2">
                  {perfisEditando.map(perfil => <Badge key={perfil} variant="secondary" className="flex items-center gap-1">
                      {perfil}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => handleRemoverPerfil(perfil)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>)}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleFecharModal}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarEdicao}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}