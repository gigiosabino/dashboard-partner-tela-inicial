
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Filter, RefreshCw, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCSV } from "@/utils/csvExport";
import { useState } from "react";

// Dados mockados para demonstração
const propostas = [
  {
    numero: "PROP-2024-001",
    dataCriacao: "15/01/2024",
    nomeCliente: "João Silva Santos",
    documentoFederal: "123.456.789-00",
    valorSolicitado: "R$ 50.000,00",
    prazo: "24 meses",
    situacao: "Aprovada",
    analista: "Maria Oliveira",
    tipoContrato: "Crédito Pessoal"
  },
  {
    numero: "PROP-2024-002",
    dataCriacao: "16/01/2024",
    nomeCliente: "Ana Carolina Lima",
    documentoFederal: "987.654.321-00",
    valorSolicitado: "R$ 75.000,00",
    prazo: "36 meses",
    situacao: "Em Análise",
    analista: "Carlos Santos",
    tipoContrato: "Financiamento"
  },
  {
    numero: "PROP-2024-003",
    dataCriacao: "17/01/2024",
    nomeCliente: "Pedro Henrique Costa",
    documentoFederal: "456.789.123-00",
    valorSolicitado: "R$ 30.000,00",
    prazo: "18 meses",
    situacao: "Rejeitada",
    analista: "Fernanda Rocha",
    tipoContrato: "Crédito Pessoal"
  },
  {
    numero: "PROP-2024-004",
    dataCriacao: "18/01/2024",
    nomeCliente: "Mariana Ferreira",
    documentoFederal: "789.123.456-00",
    valorSolicitado: "R$ 100.000,00",
    prazo: "48 meses",
    situacao: "Pendente",
    analista: "Roberto Silva",
    tipoContrato: "Financiamento"
  },
  {
    numero: "PROP-2024-005",
    dataCriacao: "19/01/2024",
    nomeCliente: "Gabriel Almeida",
    documentoFederal: "321.654.987-00",
    valorSolicitado: "R$ 25.000,00",
    prazo: "12 meses",
    situacao: "Aprovada",
    analista: "Juliana Mendes",
    tipoContrato: "Crédito Pessoal"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-100 text-green-800";
    case "Em Análise":
      return "bg-yellow-100 text-yellow-800";
    case "Rejeitada":
      return "bg-red-100 text-red-800";
    case "Pendente":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function PropostasContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleVerDetalhes = (numeroProposta: string) => {
    console.log("Ver detalhes da proposta:", numeroProposta);
  };

  const handleRefresh = () => {
    console.log("Atualizando listagem de propostas...");
    // Aqui você implementaria a lógica de atualização
  };

  const handleExportCSV = () => {
    const headers = [
      'numero',
      'dataCriacao', 
      'nomeCliente',
      'documentoFederal',
      'valorSolicitado',
      'prazo',
      'situacao',
      'analista',
      'tipoContrato'
    ];
    
    exportToCSV(propostas, 'propostas.csv', headers);
  };

  const handleFilterByPeriod = (period: string) => {
    console.log("Filtrar por período:", period);
    // Implementar filtro por período
  };

  const handleFilterBySituation = (situation: string) => {
    console.log("Filtrar por situação:", situation);
    // Implementar filtro por situação
  };

  const handleFilterByContractType = (contractType: string) => {
    console.log("Filtrar por tipo de contrato:", contractType);
    // Implementar filtro por tipo de contrato
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Propostas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Propostas</h1>
            <p className="text-gray-600">Visualize e gerencie todas as propostas do sistema</p>
          </div>
        </div>

        {/* Filtros e Ações */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            {/* Ações à esquerda */}
            <div className="flex items-center space-x-2">
              {/* Filtros */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white">
                  <DropdownMenuLabel>Filtrar por período</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleFilterByPeriod("ultima-semana")}>
                    Última semana
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterByPeriod("ultimo-mes")}>
                    Último mês
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterByPeriod("ultimos-3-meses")}>
                    Últimos 3 meses
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel>Filtrar por situação</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleFilterBySituation("Aprovada")}>
                    Aprovada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterBySituation("Em Análise")}>
                    Em Análise
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterBySituation("Rejeitada")}>
                    Rejeitada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterBySituation("Pendente")}>
                    Pendente
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuLabel>Filtrar por tipo de contrato</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleFilterByContractType("Crédito Pessoal")}>
                    Crédito Pessoal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterByContractType("Financiamento")}>
                    Financiamento
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botão de atualização */}
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>

              {/* Botão de exportação */}
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>

            {/* Campo de busca à direita */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por número, cliente ou documento..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de propostas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número da Proposta</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>Documento Federal</TableHead>
                <TableHead>Valor Solicitado</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Analista</TableHead>
                <TableHead>Tipo de Contrato</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propostas.map((proposta) => (
                <TableRow key={proposta.numero}>
                  <TableCell className="font-medium">{proposta.numero}</TableCell>
                  <TableCell>{proposta.dataCriacao}</TableCell>
                  <TableCell>{proposta.nomeCliente}</TableCell>
                  <TableCell>{proposta.documentoFederal}</TableCell>
                  <TableCell>{proposta.valorSolicitado}</TableCell>
                  <TableCell>{proposta.prazo}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(proposta.situacao)}>
                      {proposta.situacao}
                    </Badge>
                  </TableCell>
                  <TableCell>{proposta.analista}</TableCell>
                  <TableCell>{proposta.tipoContrato}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerDetalhes(proposta.numero)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Detalhes</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 mt-auto">
        <p className="text-sm text-gray-500">© 2025</p>
      </footer>
    </div>
  );
}
