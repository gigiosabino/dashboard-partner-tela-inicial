import { useState } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar, 
  Search, 
  Eye,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { DatePickerWithRange } from "./DatePickerWithRange";

export function ImportacoesRealizadasContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>(null);

  // Mock data para as importações
  const importacoes = [
    {
      id: "1",
      nomeArquivo: "clientes_janeiro_2024.csv",
      dataImportacao: "15/01/2024 14:30",
      status: "Concluída",
      registrosProcessados: 1250,
      registrosComErro: 12,
      usuarioResponsavel: "Ana Silva",
      observacoes: "Importação de clientes do primeiro trimestre"
    },
    {
      id: "2", 
      nomeArquivo: "propostas_dezembro_2023.xlsx",
      dataImportacao: "10/01/2024 09:15",
      status: "Concluída",
      registrosProcessados: 890,
      registrosComErro: 5,
      usuarioResponsavel: "Carlos Santos",
      observacoes: "Propostas finalizadas em dezembro"
    },
    {
      id: "3",
      nomeArquivo: "contratos_novembro_2023.csv", 
      dataImportacao: "28/12/2023 16:45",
      status: "Concluída com Erros",
      registrosProcessados: 2100,
      registrosComErro: 45,
      usuarioResponsavel: "Maria Costa",
      observacoes: "Alguns contratos com dados incompletos"
    },
    {
      id: "4",
      nomeArquivo: "garantias_outubro_2023.xlsx",
      dataImportacao: "15/12/2023 11:20", 
      status: "Concluída",
      registrosProcessados: 567,
      registrosComErro: 0,
      usuarioResponsavel: "João Oliveira",
      observacoes: "Importação sem erros"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Concluída":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Concluída</Badge>;
      case "Concluída com Erros":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Concluída com Erros</Badge>;
      case "Em Processamento":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Em Processamento</Badge>;
      case "Erro":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Erro</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredImportacoes = importacoes.filter(importacao =>
    importacao.nomeArquivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    importacao.usuarioResponsavel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <GlobalHeader title="Importações Realizadas" subtitle="Histórico de todas as importações de dados realizadas no sistema" />
      
      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Importações Realizadas</h1>
            <p className="text-gray-600 mt-1">Histórico de todas as importações de dados realizadas no sistema</p>
          </div>
          <Button className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Card de Resumo - movido para o topo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total de Importações</p>
                  <p className="text-2xl font-bold text-gray-900">{importacoes.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Registros Processados</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {importacoes.reduce((sum, imp) => sum + imp.registrosProcessados, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total de Erros</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {importacoes.reduce((sum, imp) => sum + imp.registrosComErro, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((importacoes.filter(i => i.status === 'Concluída').length / importacoes.length) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Filtros */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filtros de Pesquisa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Buscar por nome do arquivo ou usuário
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Digite para buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Período da importação
                </label>
                <DatePickerWithRange
                  date={selectedDate}
                  setDate={setSelectedDate}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Importações */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Histórico de Importações</CardTitle>
              <div className="text-sm text-gray-600">
                {filteredImportacoes.length} importação(ões) encontrada(s)
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Nome do Arquivo</TableHead>
                    <TableHead className="font-semibold">Data/Hora</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Registros</TableHead>
                    <TableHead className="font-semibold">Erros</TableHead>
                    <TableHead className="font-semibold">Responsável</TableHead>
                    <TableHead className="font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImportacoes.map((importacao) => (
                    <TableRow key={importacao.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {importacao.nomeArquivo}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {importacao.dataImportacao}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(importacao.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium text-blue-600">
                          {importacao.registrosProcessados.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-medium ${
                          importacao.registrosComErro > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {importacao.registrosComErro}
                        </span>
                      </TableCell>
                      <TableCell>{importacao.usuarioResponsavel}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Visualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
