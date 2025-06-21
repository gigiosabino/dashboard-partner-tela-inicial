
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Download, RefreshCcw } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { Info } from "lucide-react";

const contratos = [
  {
    proposta: "56098216",
    cpfCnpj: "170.825.668-75",
    nomeRazaoSocial: "ARLETE MARIA DE SOUSA",
    dataInclusao: "31/05/2025 14:45:06",
    valorSolicitado: "R$ 1.680,78",
    valorContratado: "R$ 1.832,16",
    totalDivida: "R$ 4.954,50",
    prazo: "15"
  },
  {
    proposta: "57294003",
    cpfCnpj: "185.499.198-10",
    nomeRazaoSocial: "FLORISBELA MARQUES DE CASTRO",
    dataInclusao: "16/06/2025 11:48:24",
    valorSolicitado: "R$ 2.500,00",
    valorContratado: "R$ 2.675,25",
    totalDivida: "R$ 7.254,45",
    prazo: "15"
  },
  {
    proposta: "55958131",
    cpfCnpj: "338.429.838-16",
    nomeRazaoSocial: "KARINA ALMEIDA RIZZI",
    dataInclusao: "29/05/2025 12:42:48",
    valorSolicitado: "R$ 1.800,00",
    valorContratado: "R$ 1.943,13",
    totalDivida: "R$ 4.250,52",
    prazo: "12"
  },
  {
    proposta: "56563108",
    cpfCnpj: "011.993.270-93",
    nomeRazaoSocial: "MARIUCHA RIBEIRO GATI",
    dataInclusao: "06/06/2025 14:07:05",
    valorSolicitado: "R$ 2.000,00",
    valorContratado: "R$ 2.160,09",
    totalDivida: "R$ 5.800,20",
    prazo: "15"
  },
  {
    proposta: "57134549",
    cpfCnpj: "777.401.309-15",
    nomeRazaoSocial: "ANDRE HEIDEMANN",
    dataInclusao: "13/06/2025 16:36:49",
    valorSolicitado: "R$ 2.739,26",
    valorContratado: "R$ 2.920,50",
    totalDivida: "R$ 7.842,00",
    prazo: "15"
  },
  {
    proposta: "57434866",
    cpfCnpj: "317.570.998-24",
    nomeRazaoSocial: "EVA SALOMÉ DA SILVA",
    dataInclusao: "17/06/2025 15:59:01",
    valorSolicitado: "R$ 2.700,00",
    valorContratado: "R$ 2.869,70",
    totalDivida: "R$ 6.674,16",
    prazo: "12"
  },
  {
    proposta: "55724283",
    cpfCnpj: "259.027.148-42",
    nomeRazaoSocial: "CRISTIANE DOS SANTOS TIMOTEO",
    dataInclusao: "26/05/2025 11:51:04",
    valorSolicitado: "R$ 1.100,00",
    valorContratado: "R$ 1.194,93",
    totalDivida: "R$ 2.772,84",
    prazo: "12"
  }
];

// Função para normalizar strings (remover acentos, converter para minúsculo)
const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Função para remover formatação de CPF/CNPJ
const removeCpfCnpjMask = (cpfCnpj: string) => {
  return cpfCnpj.replace(/[.\-\/]/g, "");
};

// Função para normalizar número da proposta (remover zeros à esquerda)
const normalizePropostaNumber = (numero: string) => {
  return numero.replace(/^0+/, "") || "0";
};

export function VisualizarContratosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [numeroPropostaFilter, setNumeroPropostaFilter] = useState("");

  const filteredContratos = contratos.filter(contrato => {
    // Filtro por busca geral
    const searchNormalized = normalizeString(searchTerm);
    const matchesSearch = 
      searchTerm === "" ||
      normalizeString(contrato.nomeRazaoSocial).includes(searchNormalized) ||
      removeCpfCnpjMask(contrato.cpfCnpj).includes(removeCpfCnpjMask(searchTerm)) ||
      normalizePropostaNumber(contrato.proposta).includes(normalizePropostaNumber(searchTerm));
    
    // Filtro por número da proposta específico (ignora período quando preenchido)
    const matchesNumeroProposta = !numeroPropostaFilter || 
      normalizePropostaNumber(contrato.proposta).includes(normalizePropostaNumber(numeroPropostaFilter));
    
    // Filtro por período (ignorado se número da proposta estiver preenchido)
    let matchesData = true;
    if (!numeroPropostaFilter && (dataInicial || dataFinal)) {
      const contratoDate = new Date(contrato.dataInclusao.split('/').reverse().join('-').split(' ')[0]);
      const startDate = dataInicial ? new Date(dataInicial) : null;
      const endDate = dataFinal ? new Date(dataFinal) : null;
      
      if (startDate && contratoDate < startDate) matchesData = false;
      if (endDate && contratoDate > endDate) matchesData = false;
    }
    
    return matchesSearch && matchesNumeroProposta && matchesData;
  });

  const handleLimparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
    setNumeroPropostaFilter("");
  };

  const handleExportarCSV = () => {
    console.log("Exportando contratos para CSV...");
  };

  const handleRefresh = () => {
    console.log("Atualizando dados...");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Visualizar Contratos" 
        subtitle="Gerencie e visualize todos os contratos" 
      />

      <main className="p-6">
        {/* Alert de informação */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Nesta tela não são apresentados contratos cancelados.
          </AlertDescription>
        </Alert>

        {/* Filtros e Ações */}
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
                onClick={handleRefresh}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button 
                onClick={handleExportarCSV}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                {filteredContratos.length} contrato(s) encontrado(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por proposta, CPF/CNPJ ou nome" 
                className="pl-10 border-slate-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Contratos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Proposta</TableHead>
                <TableHead className="text-slate-700 font-semibold">CPF/CNPJ</TableHead>
                <TableHead className="text-slate-700 font-semibold">Nome/Razão Social</TableHead>
                <TableHead className="text-slate-700 font-semibold">Data de Inclusão</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor solicitado</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor contratado</TableHead>
                <TableHead className="text-slate-700 font-semibold">Total da dívida</TableHead>
                <TableHead className="text-slate-700 font-semibold">Prazo</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContratos.map((contrato) => (
                <TableRow key={contrato.proposta} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-medium text-slate-900">{contrato.proposta}</TableCell>
                  <TableCell className="text-slate-600">{contrato.cpfCnpj}</TableCell>
                  <TableCell className="text-slate-700">{contrato.nomeRazaoSocial}</TableCell>
                  <TableCell className="text-sm text-slate-600">{contrato.dataInclusao}</TableCell>
                  <TableCell className="font-medium text-slate-900">{contrato.valorSolicitado}</TableCell>
                  <TableCell className="font-medium text-slate-900">{contrato.valorContratado}</TableCell>
                  <TableCell className="font-medium text-slate-900">{contrato.totalDivida}</TableCell>
                  <TableCell className="text-sm text-slate-600">{contrato.prazo}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 shadow-sm"
                    >
                      DETALHES
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
