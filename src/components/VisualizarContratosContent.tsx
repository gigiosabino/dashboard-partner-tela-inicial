
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Calendar, FileText } from "lucide-react";
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
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const contratos = [
  {
    proposta: "0498051",
    cpfCnpj: "02883931470",
    nomeRazaoSocial: "CLIENTE TESTE",
    dataInclusao: "19/06/2025 05:23:39",
    valorFinanciado: "1,31",
    prazo: "1"
  },
  {
    proposta: "0495505",
    cpfCnpj: "19233272249",
    nomeRazaoSocial: "AUTOMAÇÃO OAS",
    dataInclusao: "19/06/2025 08:13:51",
    valorFinanciado: "20,00",
    prazo: "3"
  },
  {
    proposta: "0495506",
    cpfCnpj: "01759213268",
    nomeRazaoSocial: "AUTOMAÇÃO OA",
    dataInclusao: "19/06/2025 08:13:52",
    valorFinanciado: "20,00",
    prazo: "4"
  },
  {
    proposta: "0495507",
    cpfCnpj: "06030939220",
    nomeRazaoSocial: "AUTOMAÇÃO OA",
    dataInclusao: "19/06/2025 08:13:53",
    valorFinanciado: "20,00",
    prazo: "3"
  },
  {
    proposta: "0495508",
    cpfCnpj: "07415257200",
    nomeRazaoSocial: "AUTOMAÇÃO OA",
    dataInclusao: "19/06/2025 08:16:46",
    valorFinanciado: "20,00",
    prazo: "3"
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
  const [cpfCnpjFilter, setCpfCnpjFilter] = useState("");
  const [nomeRazaoSocialFilter, setNomeRazaoSocialFilter] = useState("");

  const filteredContratos = contratos.filter(contrato => {
    // Filtro por busca geral
    const searchNormalized = normalizeString(searchTerm);
    const matchesSearch = 
      searchTerm === "" ||
      normalizeString(contrato.nomeRazaoSocial).includes(searchNormalized) ||
      removeCpfCnpjMask(contrato.cpfCnpj).includes(removeCpfCnpjMask(searchTerm)) ||
      normalizePropostaNumber(contrato.proposta).includes(normalizePropostaNumber(searchTerm));
    
    // Filtro por número da proposta específico
    const matchesNumeroProposta = !numeroPropostaFilter || 
      normalizePropostaNumber(contrato.proposta).includes(normalizePropostaNumber(numeroPropostaFilter));
    
    // Filtro por CPF/CNPJ
    const matchesCpfCnpj = !cpfCnpjFilter || 
      removeCpfCnpjMask(contrato.cpfCnpj).includes(removeCpfCnpjMask(cpfCnpjFilter));
    
    // Filtro por nome/razão social
    const matchesNomeRazaoSocial = !nomeRazaoSocialFilter || 
      normalizeString(contrato.nomeRazaoSocial).includes(normalizeString(nomeRazaoSocialFilter));
    
    // Filtro por período
    let matchesData = true;
    if (dataInicial || dataFinal) {
      const contratoDate = new Date(contrato.dataInclusao.split(' ')[0].split('/').reverse().join('-'));
      const startDate = dataInicial ? new Date(dataInicial) : null;
      const endDate = dataFinal ? new Date(dataFinal) : null;
      
      if (startDate && contratoDate < startDate) matchesData = false;
      if (endDate && contratoDate > endDate) matchesData = false;
    }
    
    return matchesSearch && matchesNumeroProposta && matchesCpfCnpj && matchesNomeRazaoSocial && matchesData;
  });

  const handleLimparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
    setNumeroPropostaFilter("");
    setCpfCnpjFilter("");
    setNomeRazaoSocialFilter("");
  };

  const handleExportarExcel = () => {
    console.log("Exportando contratos para Excel...");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Agenda de Recebíveis" 
        subtitle="Visualize e gerencie contratos e recebíveis" 
        icon={Calendar}
      />

      <main className="p-6">
        {/* Alert informativo */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <FileText className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Visualize contratos ativos e gerencie a agenda de recebíveis. Use os filtros para refinar sua busca.
          </AlertDescription>
        </Alert>

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
                        <label className="text-sm font-medium mb-2 block text-slate-700">Incluído de</label>
                        <Input
                          type="date"
                          value={dataInicial}
                          onChange={(e) => setDataInicial(e.target.value)}
                          className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block text-slate-700">Até</label>
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
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">CPF/CNPJ</label>
                      <Input
                        placeholder="Digite o CPF ou CNPJ"
                        value={cpfCnpjFilter}
                        onChange={(e) => setCpfCnpjFilter(e.target.value)}
                        className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Nome/Razão Social</label>
                      <Input
                        placeholder="Digite o nome ou razão social"
                        value={nomeRazaoSocialFilter}
                        onChange={(e) => setNomeRazaoSocialFilter(e.target.value)}
                        className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                      />
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
                onClick={handleExportarExcel}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
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
                <TableHead className="text-slate-700 font-semibold">Valor Financiado R$</TableHead>
                <TableHead className="text-slate-700 font-semibold">Prazo</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContratos.map((contrato) => (
                <TableRow key={contrato.proposta} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-medium text-blue-700">#{contrato.proposta}</TableCell>
                  <TableCell className="text-slate-600">{contrato.cpfCnpj}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{contrato.nomeRazaoSocial}</TableCell>
                  <TableCell className="text-sm text-slate-600">{contrato.dataInclusao}</TableCell>
                  <TableCell className="font-medium text-slate-900">{contrato.valorFinanciado}</TableCell>
                  <TableCell className="text-sm text-slate-600">{contrato.prazo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-1 h-8 w-8 border-slate-300 text-slate-700 hover:bg-slate-50"
                      >
                        <span className="text-xs">≡</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="p-1 h-8 w-8 border-slate-300 text-slate-700 hover:bg-slate-50"
                      >
                        <span className="text-xs">⚙</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">◀◀</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">◀</Button>
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">1</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">2</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">3</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">4</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">5</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">6</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">7</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">8</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">9</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">10</Button>
            <span className="text-sm text-slate-600">...</span>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">▶</Button>
            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">▶▶</Button>
          </div>
          <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
            Exibindo itens 1 - 10 de 2522
          </span>
        </div>
      </main>
    </div>
  );
}
