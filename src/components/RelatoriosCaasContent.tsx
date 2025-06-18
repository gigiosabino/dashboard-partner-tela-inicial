import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Filter, Pencil, Trash2, Calendar, Download, Play, Clock, FileText, Info, Save } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const relatorios = [
  {
    id: 1,
    nome: "Análise Financeira Completa",
    descricao: "Relatório customizado com análise detalhada",
    tipo: "Personalizado",
    ultimaExecucao: "2025-01-15 14:30",
    status: "Ativo",
    agendamento: "Diário às 14:00",
    campos: ["Data", "Valor", "Status", "Cliente", "CPF", "Parceiro"]
  },
  {
    id: 2,
    nome: "Controle de Propostas",
    descricao: "Acompanhamento detalhado de propostas",
    tipo: "Personalizado",
    ultimaExecucao: "2025-01-14 09:15",
    status: "Ativo",
    agendamento: "Personalizado - Sextas às 18:00",
    campos: ["Proposta", "Cliente", "Valor", "Status", "Data Envio"]
  }
];

const relatoriosGerados = [
  {
    id: 1,
    nome: "Relatório Padrão",
    dataGeracao: "2025-01-15 08:30",
    tipo: "Padrão",
    tamanho: "2.5 MB"
  },
  {
    id: 2,
    nome: "Análise Financeira Completa",
    dataGeracao: "2025-01-15 14:30",
    tipo: "Personalizado",
    tamanho: "4.2 MB"
  },
  {
    id: 3,
    nome: "Controle de Propostas",
    dataGeracao: "2025-01-14 18:00",
    tipo: "Personalizado",
    tamanho: "3.1 MB"
  }
];

const camposDisponiveis = [
  // Identificação
  { id: "data", nome: "Data", categoria: "Temporal" },
  { id: "proposta", nome: "Número da Proposta", categoria: "Identificação" },
  { id: "numeroContrato", nome: "Número do Contrato", categoria: "Identificação" },
  
  // Cliente
  { id: "cliente", nome: "Nome do Cliente", categoria: "Cliente" },
  { id: "cpf", nome: "CPF", categoria: "Cliente" },
  { id: "cnpj", nome: "CNPJ", categoria: "Cliente" },
  { id: "email", nome: "E-mail", categoria: "Cliente" },
  { id: "telefone", nome: "Telefone", categoria: "Cliente" },
  { id: "endereco", nome: "Endereço Completo", categoria: "Cliente" },
  { id: "rua", nome: "Rua/Logradouro", categoria: "Cliente" },
  { id: "numero", nome: "Número", categoria: "Cliente" },
  { id: "complemento", nome: "Complemento", categoria: "Cliente" },
  { id: "bairro", nome: "Bairro", categoria: "Cliente" },
  { id: "cidade", nome: "Cidade", categoria: "Cliente" },
  { id: "estado", nome: "Estado/UF", categoria: "Cliente" },
  { id: "cep", nome: "CEP", categoria: "Cliente" },
  { id: "renda", nome: "Renda Declarada", categoria: "Cliente" },
  { id: "profissao", nome: "Profissão", categoria: "Cliente" },
  { id: "estadoCivil", nome: "Estado Civil", categoria: "Cliente" },
  { id: "dataNascimento", nome: "Data de Nascimento", categoria: "Cliente" },
  
  // Financeiro
  { id: "valor", nome: "Valor Solicitado", categoria: "Financeiro" },
  { id: "valorAprovado", nome: "Valor Aprovado", categoria: "Financeiro" },
  { id: "valorLiberado", nome: "Valor Liberado", categoria: "Financeiro" },
  { id: "taxa", nome: "Taxa de Juros", categoria: "Financeiro" },
  { id: "taxaEfetiva", nome: "Taxa Efetiva", categoria: "Financeiro" },
  { id: "prazo", nome: "Prazo em Meses", categoria: "Financeiro" },
  { id: "valorParcela", nome: "Valor da Parcela", categoria: "Financeiro" },
  { id: "garantia", nome: "Tipo de Garantia", categoria: "Financeiro" },
  { id: "valorGarantia", nome: "Valor da Garantia", categoria: "Financeiro" },
  { id: "iof", nome: "IOF", categoria: "Financeiro" },
  { id: "tarifa", nome: "Tarifa", categoria: "Financeiro" },
  
  // Status
  { id: "status", nome: "Status da Proposta", categoria: "Status" },
  { id: "situacao", nome: "Situação Atual", categoria: "Status" },
  { id: "motivoRecusa", nome: "Motivo de Recusa", categoria: "Status" },
  { id: "observacoes", nome: "Observações", categoria: "Status" },
  
  // Negócio
  { id: "parceiro", nome: "Parceiro", categoria: "Negócio" },
  { id: "canal", nome: "Canal de Origem", categoria: "Negócio" },
  { id: "produto", nome: "Produto Financeiro", categoria: "Negócio" },
  { id: "modalidade", nome: "Modalidade", categoria: "Negócio" },
  { id: "tipoOperacao", nome: "Tipo de Operação", categoria: "Negócio" },
  { id: "segmento", nome: "Segmento", categoria: "Negócio" },
  { id: "origem", nome: "Origem da Proposta", categoria: "Negócio" },
  
  // Temporal
  { id: "dataEnvio", nome: "Data de Envio", categoria: "Temporal" },
  { id: "dataAnalise", nome: "Data de Análise", categoria: "Temporal" },
  { id: "dataAprovacao", nome: "Data de Aprovação", categoria: "Temporal" },
  { id: "dataRecusa", nome: "Data de Recusa", categoria: "Temporal" },
  { id: "dataAssinatura", nome: "Data de Assinatura", categoria: "Temporal" },
  { id: "dataLiberacao", nome: "Data de Liberação", categoria: "Temporal" },
  { id: "dataVencimento", nome: "Data de Vencimento", categoria: "Temporal" },
  { id: "dataPrimeiroPagamento", nome: "Data do 1º Pagamento", categoria: "Temporal" },
  { id: "dataUltimaAtualizacao", nome: "Última Atualização", categoria: "Temporal" },
  
  // Análise
  { id: "score", nome: "Score de Crédito", categoria: "Análise" },
  { id: "scoreBanco", nome: "Score do Banco", categoria: "Análise" },
  { id: "scoreSerasa", nome: "Score Serasa", categoria: "Análise" },
  { id: "scoreSpc", nome: "Score SPC", categoria: "Análise" },
  { id: "restricoes", nome: "Restrições CPF", categoria: "Análise" },
  { id: "politicaCredito", nome: "Política de Crédito", categoria: "Análise" },
  
  // Documentação
  { id: "documentos", nome: "Documentos Enviados", categoria: "Documentação" },
  { id: "statusDocumentos", nome: "Status dos Documentos", categoria: "Documentação" },
  { id: "documentosPendentes", nome: "Documentos Pendentes", categoria: "Documentação" }
];

const camposPadrao = [
  "Data de Envio",
  "Número da Proposta", 
  "Nome do Cliente",
  "CPF",
  "Valor Solicitado",
  "Status da Proposta",
  "Parceiro",
  "Canal de Origem",
  "Data de Análise"
];

export function RelatoriosCaasContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [camposSelecionados, setCamposSelecionados] = useState<string[]>([]);
  const [searchCampos, setSearchCampos] = useState("");
  const [selectedRelatorio, setSelectedRelatorio] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [relatorioToDelete, setRelatorioToDelete] = useState<any>(null);
  const [agendamentoPadrao, setAgendamentoPadrao] = useState("");
  const [horarioCustomizado, setHorarioCustomizado] = useState("");
  const [diaCustomizado, setDiaCustomizado] = useState("");
  const [isProgramarDialogOpen, setIsProgramarDialogOpen] = useState(false);
  const [isSalvarPersonalizadoOpen, setIsSalvarPersonalizadoOpen] = useState(false);
  const [nomeRelatorioPersonalizado, setNomeRelatorioPersonalizado] = useState("");
  const [descricaoRelatorioPersonalizado, setDescricaoRelatorioPersonalizado] = useState("");

  const filteredCampos = camposDisponiveis.filter(campo =>
    campo.nome.toLowerCase().includes(searchCampos.toLowerCase()) ||
    campo.categoria.toLowerCase().includes(searchCampos.toLowerCase())
  );

  const camposPorCategoria = filteredCampos.reduce((acc, campo) => {
    if (!acc[campo.categoria]) {
      acc[campo.categoria] = [];
    }
    acc[campo.categoria].push(campo);
    return acc;
  }, {} as Record<string, typeof filteredCampos>);

  const handleCampoChange = (campoId: string, checked: boolean) => {
    if (checked) {
      setCamposSelecionados([...camposSelecionados, campoId]);
    } else {
      setCamposSelecionados(camposSelecionados.filter(id => id !== campoId));
    }
  };

  const handleEditRelatorio = (relatorio: any) => {
    setSelectedRelatorio(relatorio);
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
    console.log("Gerando relatório padrão...");
    alert("Relatório padrão gerado com sucesso!");
  };

  const handleGerarRelatorioPadrao = () => {
    if (!agendamentoPadrao) {
      alert("Selecione um agendamento para o relatório padrão!");
      return;
    }
    console.log("Configurando relatório padrão:", agendamentoPadrao);
    alert("Relatório padrão configurado para geração automática!");
  };

  const handleGerarPersonalizado = () => {
    if (camposSelecionados.length === 0) {
      alert("Selecione pelo menos um campo para o relatório!");
      return;
    }
    console.log("Gerando relatório personalizado com campos:", camposSelecionados);
    alert("Relatório personalizado gerado com sucesso!");
  };

  const handleExecutarRelatorio = (relatorio: any) => {
    console.log("Executando relatório fora do horário:", relatorio);
    alert(`Relatório "${relatorio.nome}" foi solicitado para geração imediata!`);
  };

  const handleDownloadRelatorio = (relatorio: any) => {
    console.log("Baixando relatório:", relatorio);
    alert(`Download do relatório "${relatorio.nome}" iniciado!`);
  };

  const handleSalvarRelatorioPersonalizado = () => {
    if (camposSelecionados.length === 0) {
      alert("Selecione pelo menos um campo para o relatório!");
      return;
    }
    if (!nomeRelatorioPersonalizado.trim()) {
      alert("Digite um nome para o relatório!");
      return;
    }
    
    console.log("Salvando relatório personalizado:", {
      nome: nomeRelatorioPersonalizado,
      descricao: descricaoRelatorioPersonalizado,
      campos: camposSelecionados
    });
    
    // Reset form
    setNomeRelatorioPersonalizado("");
    setDescricaoRelatorioPersonalizado("");
    setCamposSelecionados([]);
    setIsSalvarPersonalizadoOpen(false);
    
    alert("Relatório personalizado salvo com sucesso!");
  };

  const handleProgramarRelatorio = () => {
    if (!diaCustomizado || !horarioCustomizado) {
      alert("Selecione o dia da semana e o horário!");
      return;
    }
    
    console.log("Programando relatório padrão:", {
      dia: diaCustomizado,
      horario: horarioCustomizado
    });
    
    setIsProgramarDialogOpen(false);
    setDiaCustomizado("");
    setHorarioCustomizado("");
    
    alert("Relatório programado! Será gerado automaticamente conforme configurado.");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Relatórios CAAS" />

      <main className="p-6">
        <Tabs defaultValue="gerador" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gerador">Gerador de Relatórios</TabsTrigger>
            <TabsTrigger value="personalizados">Relatórios Personalizados</TabsTrigger>
            <TabsTrigger value="gerados">Relatórios Gerados</TabsTrigger>
          </TabsList>

          {/* Gerador de Relatórios */}
          <TabsContent value="gerador" className="space-y-6">
            {/* Relatório Padrão */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Relatório Padrão</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Campos inclusos no relatório padrão:</strong>
                    <div className="mt-2 text-sm">
                      {camposPadrao.join(", ")}
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Agendamento automático</label>
                    <Select value={agendamentoPadrao} onValueChange={setAgendamentoPadrao}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o agendamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sem_agendamento">Não agendar</SelectItem>
                        <SelectItem value="diario">Diário às 08:00</SelectItem>
                        <SelectItem value="semanal">Semanal - Segundas às 08:00</SelectItem>
                        <SelectItem value="mensal">Mensal - Dia 1 às 08:00</SelectItem>
                        <SelectItem value="mensal_15">Mensal - Dia 15 às 08:00</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end space-x-2">
                    <Button onClick={handleGerarRelatorio} className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Gerar Relatório
                    </Button>
                    <Dialog open={isProgramarDialogOpen} onOpenChange={setIsProgramarDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Programar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Programar Relatório Padrão</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Dia da Semana</label>
                            <Select value={diaCustomizado} onValueChange={setDiaCustomizado}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o dia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="segunda">Segunda-feira</SelectItem>
                                <SelectItem value="terca">Terça-feira</SelectItem>
                                <SelectItem value="quarta">Quarta-feira</SelectItem>
                                <SelectItem value="quinta">Quinta-feira</SelectItem>
                                <SelectItem value="sexta">Sexta-feira</SelectItem>
                                <SelectItem value="sabado">Sábado</SelectItem>
                                <SelectItem value="domingo">Domingo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Horário</label>
                            <Input 
                              type="time"
                              value={horarioCustomizado}
                              onChange={(e) => setHorarioCustomizado(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsProgramarDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleProgramarRelatorio} className="bg-blue-600 hover:bg-blue-700">
                            Salvar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relatório Personalizado */}
            <Card>
              <CardHeader>
                <CardTitle>Relatório Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Seleção de Campos */}
                  <div className="lg:col-span-2">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Buscar campos..." 
                        className="pl-10"
                        value={searchCampos}
                        onChange={(e) => setSearchCampos(e.target.value)}
                      />
                    </div>
                    
                    <ScrollArea className="h-96 border border-gray-200 rounded-lg p-4">
                      <div className="space-y-4">
                        {Object.entries(camposPorCategoria).map(([categoria, campos]) => (
                          <div key={categoria}>
                            <h4 className="font-medium text-gray-900 mb-2 sticky top-0 bg-white py-1">
                              {categoria}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                              {campos.map((campo) => (
                                <div key={campo.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                  <Checkbox 
                                    id={campo.id}
                                    checked={camposSelecionados.includes(campo.id)}
                                    onCheckedChange={(checked) => handleCampoChange(campo.id, checked as boolean)}
                                  />
                                  <label htmlFor={campo.id} className="text-sm cursor-pointer flex-1">
                                    {campo.nome}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-3" />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Campos Selecionados */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Campos Selecionados ({camposSelecionados.length})</h4>
                    <div className="border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
                      {camposSelecionados.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhum campo selecionado</p>
                      ) : (
                        <div className="space-y-2">
                          {camposSelecionados.map((campoId) => {
                            const campo = camposDisponiveis.find(c => c.id === campoId);
                            return campo ? (
                              <div key={campoId} className="flex items-center justify-between p-2 bg-blue-50 rounded text-sm">
                                <span>{campo.nome}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCampoChange(campoId, false)}
                                  className="h-6 w-6 p-0 hover:bg-red-100"
                                >
                                  ×
                                </Button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Dialog open={isSalvarPersonalizadoOpen} onOpenChange={setIsSalvarPersonalizadoOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={camposSelecionados.length === 0}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Relatório
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Salvar Relatório Personalizado</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Nome do Relatório *</label>
                              <Input 
                                placeholder="Digite o nome do relatório"
                                value={nomeRelatorioPersonalizado}
                                onChange={(e) => setNomeRelatorioPersonalizado(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Descrição</label>
                              <Textarea 
                                placeholder="Descrição opcional do relatório"
                                value={descricaoRelatorioPersonalizado}
                                onChange={(e) => setDescricaoRelatorioPersonalizado(e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm font-medium mb-1">Campos selecionados: {camposSelecionados.length}</p>
                              <div className="text-xs text-gray-600 max-h-20 overflow-y-auto">
                                {camposSelecionados.map(campoId => {
                                  const campo = camposDisponiveis.find(c => c.id === campoId);
                                  return campo?.nome;
                                }).join(", ")}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsSalvarPersonalizadoOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleSalvarRelatorioPersonalizado} className="bg-green-600 hover:bg-green-700">
                              Salvar
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relatórios Personalizados */}
          <TabsContent value="personalizados">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Relatórios Personalizados</CardTitle>
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar relatórios..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
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
                        <TableCell className="text-sm text-gray-600">
                          {relatorio.ultimaExecucao}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
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
                              onClick={() => handleExecutarRelatorio(relatorio)}
                              title="Executar agora"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relatórios Gerados */}
          <TabsContent value="gerados">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Gerados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Relatório</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data/Hora de Geração</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relatoriosGerados.map((relatorio) => (
                      <TableRow key={relatorio.id}>
                        <TableCell className="font-medium">{relatorio.nome}</TableCell>
                        <TableCell>
                          <Badge variant={relatorio.tipo === "Padrão" ? "secondary" : "default"}>
                            {relatorio.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {relatorio.dataGeracao}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {relatorio.tamanho}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadRelatorio(relatorio)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
                      <SelectItem value="diario">Diário às 08:00</SelectItem>
                      <SelectItem value="semanal">Semanal - Segundas às 08:00</SelectItem>
                      <SelectItem value="mensal">Mensal - Dia 1 às 08:00</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Horário Personalizado */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dia da Semana</label>
                    <Select value={diaCustomizado} onValueChange={setDiaCustomizado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="segunda">Segunda-feira</SelectItem>
                        <SelectItem value="terca">Terça-feira</SelectItem>
                        <SelectItem value="quarta">Quarta-feira</SelectItem>
                        <SelectItem value="quinta">Quinta-feira</SelectItem>
                        <SelectItem value="sexta">Sexta-feira</SelectItem>
                        <SelectItem value="sabado">Sábado</SelectItem>
                        <SelectItem value="domingo">Domingo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Horário</label>
                    <Input 
                      type="time"
                      value={horarioCustomizado}
                      onChange={(e) => setHorarioCustomizado(e.target.value)}
                    />
                  </div>
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
