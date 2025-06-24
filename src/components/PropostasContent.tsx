import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Download } from "lucide-react";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "@/components/GlobalHeader";

const propostas = [
  {
    numero: "056939510",
    parceiro: "BMP Money Plus",
    cliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    cpf: "077.445.417-23",
    valor: "R$ 20.000,00",
    status: "Aprovada",
    dataContratacao: "05/06/2025",
    prazo: "24 meses"
  },
  {
    numero: "056441261",
    parceiro: "Financeira XYZ",
    cliente: "JOÃO SILVA SANTOS",
    cpf: "123.456.789-00",
    valor: "R$ 15.000,00",
    status: "Paga",
    dataContratacao: "04/06/2025",
    prazo: "18 meses"
  },
  {
    numero: "056411663",
    parceiro: "Crédito ABC",
    cliente: "MARIA OLIVEIRA COSTA",
    cpf: "987.654.321-11",
    valor: "R$ 30.000,00",
    status: "Liberada",
    dataContratacao: "03/06/2025",
    prazo: "36 meses"
  },
  {
    numero: "056386138",
    parceiro: "BMP Money Plus",
    cliente: "CARLOS EDUARDO FERREIRA",
    cpf: "456.789.123-22",
    valor: "R$ 10.000,00",
    status: "Finalizada",
    dataContratacao: "02/06/2025",
    prazo: "12 meses"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "outline";
    case "Paga":
      return "default";
    case "Liberada":
      return "secondary";
    case "Finalizada":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-50 text-green-700 border-green-200";
    case "Paga":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Liberada":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Finalizada":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

// Função para normalizar strings (remover acentos, converter para minúsculo)
const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Função para remover formatação de CPF
const removeCpfMask = (cpf: string) => {
  return cpf.replace(/[.\-]/g, "");
};

// Função para normalizar número da proposta (remover zeros à esquerda)
const normalizePropostaNumber = (numero: string) => {
  return numero.replace(/^0+/, "") || "0";
};

export function PropostasContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [numeroPropostaFilter, setNumeroPropostaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleDetalhes = (numeroProposta: string) => {
    navigate(`/propostas/${numeroProposta}`);
  };

  const filteredPropostas = propostas.filter(proposta => {
    // Filtro por busca geral
    const searchNormalized = normalizeString(searchTerm);
    const matchesSearch = 
      searchTerm === "" ||
      normalizeString(proposta.cliente).includes(searchNormalized) ||
      normalizeString(proposta.parceiro).includes(searchNormalized) ||
      removeCpfMask(proposta.cpf).includes(removeCpfMask(searchTerm)) ||
      normalizePropostaNumber(proposta.numero).includes(normalizePropostaNumber(searchTerm));
    
    // Filtro por número da proposta específico (ignora período quando preenchido)
    const matchesNumeroProposta = !numeroPropostaFilter || 
      normalizePropostaNumber(proposta.numero).includes(normalizePropostaNumber(numeroPropostaFilter));
    
    // Filtro por status
    const matchesStatus = !statusFilter || proposta.status === statusFilter;
    
    // Filtro por período (ignorado se número da proposta estiver preenchido)
    let matchesData = true;
    if (!numeroPropostaFilter && (dataInicial || dataFinal)) {
      const propostaDate = new Date(proposta.dataContratacao.split('/').reverse().join('-'));
      const startDate = dataInicial ? new Date(dataInicial) : null;
      const endDate = dataFinal ? new Date(dataFinal) : null;
      
      if (startDate && propostaDate < startDate) matchesData = false;
      if (endDate && propostaDate > endDate) matchesData = false;
    }
    
    return matchesSearch && matchesNumeroProposta && matchesStatus && matchesData;
  });

  const handleLimparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
    setNumeroPropostaFilter("");
    setStatusFilter("");
  };

  const handleExportarCSV = () => {
    console.log("Exportando propostas para CSV...");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Propostas Contratadas" 
        subtitle="Gerencie e acompanhe todas as propostas contratadas" 
      />

      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 bg-white p-4 border-slate-200 shadow-lg">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-slate-700">Data Inicial</label>
                        <Input
                          type="date"
                          value={dataInicial}
                          onChange={(e) => setDataInicial(e.target.value)}
                          className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block text-slate-700">Data Final</label>
                        <Input
                          type="date"
                          value={dataFinal}
                          onChange={(e) => setDataFinal(e.target.value)}
                          className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Número da Proposta</label>
                      <Input
                        placeholder="Digite o número da proposta"
                        value={numeroPropostaFilter}
                        onChange={(e) => setNumeroPropostaFilter(e.target.value)}
                        className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Ignora o período quando preenchido
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="border-slate-300 focus:border-blue-600 focus:ring-blue-600">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-200 bg-white shadow-lg">
                          <SelectItem value="Aprovada" className="text-slate-700 hover:bg-slate-50">Aprovada</SelectItem>
                          <SelectItem value="Paga" className="text-slate-700 hover:bg-slate-50">Paga</SelectItem>
                          <SelectItem value="Liberada" className="text-slate-700 hover:bg-slate-50">Liberada</SelectItem>
                          <SelectItem value="Finalizada" className="text-slate-700 hover:bg-slate-50">Finalizada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleLimparFiltros}
                        className="border-slate-300 text-slate-600 hover:bg-slate-50"
                      >
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                onClick={handleExportarCSV}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                {filteredPropostas.length} proposta(s) encontrada(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por cliente, CPF, proposta ou parceiro" 
                className="pl-10 border-slate-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Propostas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Número</TableHead>
                <TableHead className="text-slate-700 font-semibold">Parceiro</TableHead>
                <TableHead className="text-slate-700 font-semibold">Cliente</TableHead>
                <TableHead className="text-slate-700 font-semibold">CPF</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor</TableHead>
                <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                <TableHead className="text-slate-700 font-semibold">Data Contratação</TableHead>
                <TableHead className="text-slate-700 font-semibold">Prazo</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPropostas.map((proposta) => (
                <TableRow key={proposta.numero} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-medium text-blue-700">#{proposta.numero}</TableCell>
                  <TableCell className="text-slate-700">{proposta.parceiro}</TableCell>
                  <TableCell className="text-slate-700">{proposta.cliente}</TableCell>
                  <TableCell className="text-slate-600">{proposta.cpf}</TableCell>
                  <TableCell className="font-medium text-slate-900">{proposta.valor}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(proposta.status)} className={getStatusColor(proposta.status)}>
                      {proposta.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{proposta.dataContratacao}</TableCell>
                  <TableCell className="text-sm text-slate-600">{proposta.prazo}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
                      onClick={() => handleDetalhes(proposta.numero)}
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
