
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, Plus, Pencil, Trash2, Calendar, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const relatorios = [
  {
    id: 1,
    nome: "Padrão Financeiro",
    descricao: "Relatório padrão com informações financeiras básicas",
    tipo: "Padrão",
    ultimaExecucao: "2025-01-15 14:30",
    status: "Ativo",
    agendamento: "Diário às 14:00",
    campos: ["Data", "Valor", "Status", "Cliente"]
  },
  {
    id: 2,
    nome: "Análise Personalizada",
    descricao: "Relatório customizado com filtros específicos",
    tipo: "Personalizado",
    ultimaExecucao: "2025-01-14 09:15",
    status: "Ativo",
    agendamento: "Semanal - Segundas 09:00",
    campos: ["Data", "Proposta", "Cliente", "CPF", "Valor", "Status", "Parceiro"]
  }
];

const camposDisponiveis = [
  { id: "data", nome: "Data", categoria: "Temporal" },
  { id: "proposta", nome: "Número da Proposta", categoria: "Identificação" },
  { id: "cliente", nome: "Nome do Cliente", categoria: "Cliente" },
  { id: "cpf", nome: "CPF", categoria: "Cliente" },
  { id: "cnpj", nome: "CNPJ", categoria: "Cliente" },
  { id: "email", nome: "E-mail", categoria: "Cliente" },
  { id: "telefone", nome: "Telefone", categoria: "Cliente" },
  { id: "endereco", nome: "Endereço", categoria: "Cliente" },
  { id: "cidade", nome: "Cidade", categoria: "Cliente" },
  { id: "estado", nome: "Estado", categoria: "Cliente" },
  { id: "cep", nome: "CEP", categoria: "Cliente" },
  { id: "valor", nome: "Valor Solicitado", categoria: "Financeiro" },
  { id: "valorAprovado", nome: "Valor Aprovado", categoria: "Financeiro" },
  { id: "taxa", nome: "Taxa de Juros", categoria: "Financeiro" },
  { id: "prazo", nome: "Prazo", categoria: "Financeiro" },
  { id: "status", nome: "Status da Proposta", categoria: "Status" },
  { id: "situacao", nome: "Situação", categoria: "Status" },
  { id: "parceiro", nome: "Parceiro", categoria: "Negócio" },
  { id: "canal", nome: "Canal de Origem", categoria: "Negócio" },
  { id: "produto", nome: "Produto", categoria: "Negócio" },
  { id: "modalidade", nome: "Modalidade", categoria: "Negócio" },
  { id: "dataEnvio", nome: "Data de Envio", categoria: "Temporal" },
  { id: "dataAprovacao", nome: "Data de Aprovação", categoria: "Temporal" },
  { id: "dataVencimento", nome: "Data de Vencimento", categoria: "Temporal" },
  { id: "dataUltimaAtualizacao", nome: "Última Atualização", categoria: "Temporal" },
  { id: "observacoes", nome: "Observações", categoria: "Outros" },
  { id: "numeroContrato", nome: "Número do Contrato", categoria: "Identificação" },
  { id: "garantia", nome: "Tipo de Garantia", categoria: "Financeiro" },
  { id: "score", nome: "Score de Crédito", categoria: "Análise" },
  { id: "renda", nome: "Renda Declarada", categoria: "Cliente" },
  { id: "profissao", nome: "Profissão", categoria: "Cliente" }
];

export function RelatoriosCaasContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoPersonalizado, setTipoPersonalizado] = useState(false);
  const [camposSelecionados, setCamposSelecionados] = useState<string[]>([]);
  const [searchCampos, setSearchCampos] = useState("");
  const [selectedRelatorio, setSelectedRelatorio] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [relatorioToDelete, setRelatorioToDelete] = useState<any>(null);

  const filteredCampos = camposDisponiveis.filter(campo =>
    campo.nome.toLowerCase().includes(searchCampos.toLowerCase()) ||
    campo.categoria.toLowerCase().includes(searchCampos.toLowerCase())
  );

  const handleCampoChange = (campoId: string, checked: boolean) => {
    if (checked) {
      setCamposSelecionados([...camposSelecionados, campoId]);
    } else {
      setCamposSelecionados(camposSelecionados.filter(id => id !== campoId));
    }
  };

  const handleEditRelatorio = (relatorio: any) => {
    setSelectedRelatorio(relatorio);
    console.log("Editando relatório:", relatorio);
  };

  const handleDeleteRelatorio = (relatorio: any) => {
    setRelatorioToDelete(relatorio);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Excluindo relatório:", relatorioToDelete);
    setIsDeleteDialogOpen(false);
    setRelatorioToDelete(null);
  };

  const handleGerarRelatorio = () => {
    console.log("Gerando relatório...");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Relatórios CAAS" subtitle="Gerencie e customize seus relatórios" />

      {/* Main Content */}
      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 bg-white p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="padrao">Padrão</SelectItem>
                          <SelectItem value="personalizado">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="personalizado" className="text-sm font-medium">
                  Personalizado
                </label>
                <Switch
                  id="personalizado"
                  checked={tipoPersonalizado}
                  onCheckedChange={setTipoPersonalizado}
                />
              </div>
              
              <span className="text-sm text-gray-600">{relatorios.length} relatório(s) encontrado(s)</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar relatórios..." 
                  className="pl-10 border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Relatório
              </Button>
            </div>
          </div>
        </div>

        {/* Seleção de Campos Personalizada */}
        {tipoPersonalizado && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Campos do Relatório</h3>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Buscar campos..." 
                    className="pl-10"
                    value={searchCampos}
                    onChange={(e) => setSearchCampos(e.target.value)}
                  />
                </div>
                
                <ScrollArea className="h-80 border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {filteredCampos.map((campo) => (
                      <div key={campo.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <Checkbox 
                          id={campo.id}
                          checked={camposSelecionados.includes(campo.id)}
                          onCheckedChange={(checked) => handleCampoChange(campo.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <label htmlFor={campo.id} className="text-sm font-medium cursor-pointer">
                            {campo.nome}
                          </label>
                          <p className="text-xs text-gray-500">{campo.categoria}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="w-80">
                <h4 className="font-medium text-gray-900 mb-2">Campos Selecionados ({camposSelecionados.length})</h4>
                <div className="border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
                  {camposSelecionados.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhum campo selecionado</p>
                  ) : (
                    <div className="space-y-2">
                      {camposSelecionados.map((campoId) => {
                        const campo = camposDisponiveis.find(c => c.id === campoId);
                        return campo ? (
                          <div key={campoId} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                            <span className="text-sm">{campo.nome}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCampoChange(campoId, false)}
                              className="h-6 w-6 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button 
                    onClick={handleGerarRelatorio}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={camposSelecionados.length === 0}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de relatórios */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Relatórios Disponíveis</h2>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Última Execução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agendamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorios.map((relatorio) => (
                <TableRow key={relatorio.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{relatorio.nome}</div>
                      <div className="text-sm text-gray-500">{relatorio.descricao}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={relatorio.tipo === "Padrão" ? "secondary" : "default"}>
                      {relatorio.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {relatorio.ultimaExecucao}
                  </TableCell>
                  <TableCell>
                    <Badge variant={relatorio.status === "Ativo" ? "default" : "secondary"}>
                      {relatorio.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {relatorio.agendamento}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRelatorio(relatorio)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRelatorio(relatorio)}
                        className="text-red-600 hover:text-red-800"
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

        {/* Dialog de Edição */}
        <Dialog open={!!selectedRelatorio} onOpenChange={() => setSelectedRelatorio(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Relatório</DialogTitle>
            </DialogHeader>
            {selectedRelatorio && (
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Relatório</label>
                  <Input defaultValue={selectedRelatorio.nome} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <Input defaultValue={selectedRelatorio.descricao} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Agendamento</label>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedRelatorio(null)}>
                    Cancelar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de Confirmação de Exclusão */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600">
                Tem certeza que deseja excluir o relatório "{relatorioToDelete?.nome}"?
              </p>
              <p className="text-sm text-red-600 mt-2">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Excluir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
