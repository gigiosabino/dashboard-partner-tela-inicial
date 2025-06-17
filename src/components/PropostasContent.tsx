
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/DateRangePicker";
import { exportToCSV } from "@/utils/csvExport";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dados mockados para demonstração
const propostas = [
  {
    numero: "004935629",
    dataCriacao: "15/01/2024",
    nomeCliente: "João Silva Santos",
    documentoFederal: "123.456.789-00",
    valorSolicitado: "R$ 50.000,00",
    prazo: "24",
    situacao: "Cedida",
    analista: "Maria Oliveira",
    tipoContrato: "CG",
    valorAprovado: "R$ 50.000,00"
  },
  {
    numero: "004935630",
    dataCriacao: "16/01/2024",
    nomeCliente: "Ana Carolina Lima",
    documentoFederal: "987.654.321-00",
    valorSolicitado: "R$ 75.000,00",
    prazo: "36",
    situacao: "Em Análise",
    analista: "Carlos Santos",
    tipoContrato: "CDC",
    valorAprovado: "R$ 0,00"
  },
  {
    numero: "004935631",
    dataCriacao: "17/01/2024",
    nomeCliente: "Pedro Henrique Costa",
    documentoFederal: "456.789.123-00",
    valorSolicitado: "R$ 30.000,00",
    prazo: "18",
    situacao: "Cancelada",
    analista: "Fernanda Rocha",
    tipoContrato: "EP",
    valorAprovado: "R$ 0,00"
  },
  {
    numero: "004935632",
    dataCriacao: "18/01/2024",
    nomeCliente: "Mariana Ferreira",
    documentoFederal: "789.123.456-00",
    valorSolicitado: "R$ 100.000,00",
    prazo: "48",
    situacao: "Cedida",
    analista: "Roberto Silva",
    tipoContrato: "CG",
    valorAprovado: "R$ 100.000,00"
  },
  {
    numero: "004935633",
    dataCriacao: "19/01/2024",
    nomeCliente: "Gabriel Almeida",
    documentoFederal: "321.654.987-00",
    valorSolicitado: "R$ 25.000,00",
    prazo: "12",
    situacao: "Cedida",
    analista: "Juliana Mendes",
    tipoContrato: "CDC",
    valorAprovado: "R$ 25.000,00"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Cedida":
      return "bg-green-500";
    case "Em Análise":
      return "bg-yellow-500";
    case "Cancelada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function PropostasContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterProposalNumber, setFilterProposalNumber] = useState("");
  const [filterSituation, setFilterSituation] = useState("");
  const [filterContractType, setFilterContractType] = useState("");

  const handleVerDetalhes = (numeroProposta: string) => {
    navigate(`/propostas/${numeroProposta}`);
  };

  const handleRefresh = () => {
    console.log("Atualizando listagem de propostas...");
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

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    console.log("Filtrar por período:", { startDate, endDate });
  };

  const handleClearFilters = () => {
    setFilterStartDate(null);
    setFilterEndDate(null);
    setFilterProposalNumber("");
    setFilterSituation("");
    setFilterContractType("");
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Propostas Contratadas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Top Section - Action Buttons */}
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
                      <label className="text-sm font-medium mb-2 block">Período</label>
                      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Número da Proposta</label>
                      <Input
                        placeholder="Digite o número da proposta"
                        value={filterProposalNumber}
                        onChange={(e) => setFilterProposalNumber(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Situação</label>
                      <Select value={filterSituation} onValueChange={setFilterSituation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a situação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cedida">Cedida</SelectItem>
                          <SelectItem value="Em Análise">Em Análise</SelectItem>
                          <SelectItem value="Cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm" onClick={handleClearFilters}>
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" onClick={handleRefresh} className="border-gray-300 hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>

              <Button variant="outline" onClick={handleExportCSV} className="border-gray-300 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>

            {/* Campo de busca */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Pesquisar" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de propostas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Número CCB</TableHead>
                <TableHead className="font-semibold text-gray-700">Situação</TableHead>
                <TableHead className="font-semibold text-gray-700">Tipo de contrato</TableHead>
                <TableHead className="font-semibold text-gray-700">Vendedor</TableHead>
                <TableHead className="font-semibold text-gray-700">Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">Solicitado</TableHead>
                <TableHead className="font-semibold text-gray-700">Aprovado</TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propostas.map((proposta) => (
                <TableRow key={proposta.numero} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">#{proposta.numero}</div>
                      <div className="text-sm text-gray-500">{proposta.dataCriacao}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(proposta.situacao)}`}></div>
                      <span className="text-sm">{proposta.situacao}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{proposta.tipoContrato}</TableCell>
                  <TableCell className="text-sm">{proposta.analista}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.nomeCliente}</div>
                      <div className="text-sm text-gray-500">{proposta.documentoFederal}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.valorSolicitado}</div>
                      <div className="text-sm text-gray-500">Em {proposta.prazo} parcelas</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.valorAprovado}</div>
                      <div className="text-sm text-gray-500">Em {proposta.prazo} parcelas</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerDetalhes(proposta.numero)}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
