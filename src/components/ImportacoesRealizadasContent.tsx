
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ImportacoesRealizadasContent() {
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedImportacao, setSelectedImportacao] = useState<any>(null);

  const importacoesRealizadas = [
    {
      id: "IMP001",
      dataImportacao: "2024-01-15",
      usuario: "João Silva",
      arquivo: "limite_credito_janeiro.xlsx",
      totalRegistros: 150,
      sucessos: 145,
      erros: 5,
      status: "Concluída",
    },
    {
      id: "IMP002",
      dataImportacao: "2024-01-10",
      usuario: "Maria Santos",
      arquivo: "limite_credito_dezembro.xlsx",
      totalRegistros: 200,
      sucessos: 200,
      erros: 0,
      status: "Concluída",
    },
    {
      id: "IMP003",
      dataImportacao: "2024-01-08",
      usuario: "Pedro Costa",
      arquivo: "limite_credito_novembro.xlsx",
      totalRegistros: 100,
      sucessos: 85,
      erros: 15,
      status: "Concluída com Erros",
    },
  ];

  const handleViewImportacao = (importacao: any) => {
    setSelectedImportacao(importacao);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-green-100 text-green-800";
      case "Concluída com Erros":
        return "bg-yellow-100 text-yellow-800";
      case "Em Processamento":
        return "bg-blue-100 text-blue-800";
      case "Erro":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <GlobalHeader title="Importações Realizadas" subtitle="Histórico de importações de limite de crédito" />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Importações Realizadas</h2>
            </div>

            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>
                  Filtre as importações por data, status ou usuário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Data da Importação:</label>
                    <Input
                      type="date"
                      value={filtroData}
                      onChange={(e) => setFiltroData(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status:</label>
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concluida">Concluída</SelectItem>
                        <SelectItem value="concluida-erros">Concluída com Erros</SelectItem>
                        <SelectItem value="processamento">Em Processamento</SelectItem>
                        <SelectItem value="erro">Erro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Usuário:</label>
                    <Input
                      placeholder="Digite o nome do usuário"
                      value={filtroUsuario}
                      onChange={(e) => setFiltroUsuario(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Pesquisar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Importações */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Importações</CardTitle>
                <CardDescription>
                  Lista de todas as importações de limite de crédito realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data da Importação</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Total de Registros</TableHead>
                      <TableHead>Sucessos</TableHead>
                      <TableHead>Erros</TableHead>
                      <TableHead>Status</TableHead>
                      <Table Head>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importacoesRealizadas.map((importacao) => (
                      <TableRow key={importacao.id}>
                        <TableCell className="font-medium">{importacao.id}</TableCell>
                        <TableCell>{new Date(importacao.dataImportacao).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{importacao.usuario}</TableCell>
                        <TableCell>{importacao.arquivo}</TableCell>
                        <TableCell>{importacao.totalRegistros}</TableCell>
                        <TableCell className="text-green-600 font-semibold">{importacao.sucessos}</TableCell>
                        <TableCell className="text-red-600 font-semibold">{importacao.erros}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(importacao.status)}`}>
                            {importacao.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewImportacao(importacao)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Modal de Visualização */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Detalhes da Importação - {selectedImportacao?.id}</DialogTitle>
                </DialogHeader>
                {selectedImportacao && (
                  <div className="space-y-8">
                    {/* Resumo da Importação */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-blue-50">
                        <CardTitle className="text-lg text-blue-700">Resumo da Importação</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium mb-1">Data da Importação:</label>
                            <p className="text-sm">{new Date(selectedImportacao.dataImportacao).toLocaleDateString('pt-BR')}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Usuário:</label>
                            <p className="text-sm">{selectedImportacao.usuario}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Arquivo:</label>
                            <p className="text-sm">{selectedImportacao.arquivo}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Status:</label>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedImportacao.status)}`}>
                              {selectedImportacao.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded">
                            <p className="text-2xl font-bold text-blue-600">{selectedImportacao.totalRegistros}</p>
                            <p className="text-sm text-gray-600">Total</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded">
                            <p className="text-2xl font-bold text-green-600">{selectedImportacao.sucessos}</p>
                            <p className="text-sm text-gray-600">Sucessos</p>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded">
                            <p className="text-2xl font-bold text-red-600">{selectedImportacao.erros}</p>
                            <p className="text-sm text-gray-600">Erros</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Pessoa */}
                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader className="bg-green-50">
                        <CardTitle className="text-lg text-green-700">Dados da Pessoa</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">CPF/CNPJ:</label>
                            <p className="text-sm">011.075.550-27</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Tipo de Pessoa:</label>
                            <p className="text-sm">Pessoa Jurídica</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Nome/Razão Social:</label>
                            <p className="text-sm">Nome Modelo Teste</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Nome Fantasia:</label>
                            <p className="text-sm">-</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">E-mail:</label>
                            <p className="text-sm">emailTeste@emails.com.br</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Telefone Fixo:</label>
                            <p className="text-sm">(11) 3435-3208</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Telefone Celular:</label>
                            <p className="text-sm">(11) 94178-9929</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Pessoa Endereço */}
                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader className="bg-orange-50">
                        <CardTitle className="text-lg text-orange-700">Endereço da Pessoa</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">CEP:</label>
                            <p className="text-sm">65.095-361</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Logradouro:</label>
                            <p className="text-sm">Rua Major Palma</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Número:</label>
                            <p className="text-sm">1787</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Complemento:</label>
                            <p className="text-sm">CJ 10</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Bairro:</label>
                            <p className="text-sm">Floresta</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Cidade:</label>
                            <p className="text-sm">Guarulhos</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">UF:</label>
                            <p className="text-sm">SP</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Solicitação Análise de Crédito */}
                    <Card className="border-l-4 border-l-purple-500">
                      <CardHeader className="bg-purple-50">
                        <CardTitle className="text-lg text-purple-700">Solicitação Análise de Crédito</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Situação Inicial:</label>
                            <p className="text-sm">CAPITAL DE GIRO</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Tipo de Operação:</label>
                            <p className="text-sm">CAPITAL DE GIRO</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Valor Solicitado:</label>
                            <p className="text-sm">R$ 1.500,00</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Percentual de Juros:</label>
                            <p className="text-sm">1,50%</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Prazo Mínimo (dias):</label>
                            <p className="text-sm">10</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Prazo Máximo (dias):</label>
                            <p className="text-sm">90</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Tipo de Tarifa (TA):</label>
                            <p className="text-sm">Porcentagem</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Tarifa (TA):</label>
                            <p className="text-sm">2,00%</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Parcela Mínima:</label>
                            <p className="text-sm">50</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Parcela Máxima:</label>
                            <p className="text-sm">50</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Seção Assinante */}
                    <Card className="border-l-4 border-l-red-500">
                      <CardHeader className="bg-red-50">
                        <CardTitle className="text-lg text-red-700">Dados do Assinante</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Documento Federal:</label>
                            <p className="text-sm">590.496.170-14</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Nome:</label>
                            <p className="text-sm">modelo teste</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Telefone/Celular:</label>
                            <p className="text-sm">(11) 99999-9999</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">E-mail:</label>
                            <p className="text-sm">modelo@teste.com.br</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Data de Nascimento:</label>
                            <p className="text-sm">01/04/2001</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Papel:</label>
                            <p className="text-sm">Assinante</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Estado Civil:</label>
                            <p className="text-sm">Casado</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">RG:</label>
                            <p className="text-sm">29.108-440</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Banco:</label>
                            <p className="text-sm">IBES</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Logradouro:</label>
                            <p className="text-sm">Rua Presidente John Kennedy</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Número:</label>
                            <p className="text-sm">127</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Complemento:</label>
                            <p className="text-sm">-</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Cidade:</label>
                            <p className="text-sm">Vila Velha</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">UF:</label>
                            <p className="text-sm">ES</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Ordem Assinatura:</label>
                            <p className="text-sm">1</p>
                          </div>
                          <div></div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                        Fechar
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
