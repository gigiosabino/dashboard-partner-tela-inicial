
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
import { Link } from "react-router-dom";

export function PropostasContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>(null);

  // Mock data para as propostas
  const propostas = [
    {
      numero: "2024001",
      cliente: "Nome do cliente",
      valor: "R$ 150.000,00",
      prazo: "24",
      status: "Ativa",
      dataContratacao: "15/01/2024",
      taxaJuros: "2,50%"
    },
    {
      numero: "2024002", 
      cliente: "Nome do cliente",
      valor: "R$ 75.500,00",
      prazo: "12",
      status: "Pendente",
      dataContratacao: "10/01/2024",
      taxaJuros: "2,80%"
    },
    {
      numero: "2024003",
      cliente: "Nome do cliente", 
      valor: "R$ 200.000,00",
      prazo: "36",
      status: "Ativa",
      dataContratacao: "08/01/2024",
      taxaJuros: "2,35%"
    },
    {
      numero: "2024004",
      cliente: "Nome do cliente",
      valor: "R$ 95.000,00", 
      prazo: "18",
      status: "Cancelada",
      dataContratacao: "05/01/2024",
      taxaJuros: "2,65%"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativa":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativa</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredPropostas = propostas.filter(proposta =>
    proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <GlobalHeader title="Propostas Contratadas" subtitle="Gerencie e visualize todas as propostas contratadas" />
      
      <main className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Propostas Contratadas</h1>
            <p className="text-gray-600 mt-1">Gerencie e visualize todas as propostas contratadas</p>
          </div>
          <Button className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
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
                  Buscar por número ou cliente
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
                  Período de contratação
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

        {/* Tabela de Propostas */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Lista de Propostas</CardTitle>
              <div className="text-sm text-gray-600">
                {filteredPropostas.length} proposta(s) encontrada(s)
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Número</TableHead>
                    <TableHead className="font-semibold">Cliente</TableHead>
                    <TableHead className="font-semibold">Valor</TableHead>
                    <TableHead className="font-semibold">Prazo</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Data</TableHead>
                    <TableHead className="font-semibold">Taxa</TableHead>
                    <TableHead className="font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPropostas.map((proposta) => (
                    <TableRow key={proposta.numero} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-blue-600">
                        {proposta.numero}
                      </TableCell>
                      <TableCell>{proposta.cliente}</TableCell>
                      <TableCell className="font-medium">
                        {proposta.valor}
                      </TableCell>
                      <TableCell className="text-center">
                        {proposta.prazo}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(proposta.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {proposta.dataContratacao}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {proposta.taxaJuros}
                      </TableCell>
                      <TableCell>
                        <Link to={`/propostas/${proposta.numero}`}>
                          <Button 
                            size="sm" 
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Ver Detalhes
                          </Button>
                        </Link>
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
