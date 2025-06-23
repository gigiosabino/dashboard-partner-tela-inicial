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
import { Search, FileText, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

  const handleDownloadRelatorio = (id: string) => {
    console.log(`Baixando relatório da importação ${id}`);
  };

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
                      <TableHead>Ações</TableHead>
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
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Detalhes da Importação - {selectedImportacao?.id}</DialogTitle>
                </DialogHeader>
                {selectedImportacao && (
                  <div className="space-y-6">
                    {/* Informações Gerais */}
                    <div className="grid grid-cols-2 gap-4">
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

                    {/* Resumo */}
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
