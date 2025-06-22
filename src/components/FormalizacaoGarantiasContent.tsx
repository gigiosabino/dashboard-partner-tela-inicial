
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
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
import { DateRangePicker } from "@/components/DateRangePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "@/components/GlobalHeader";

const propostas = [
  {
    numero: "004935629",
    dataEnv: "05/06/2025",
    nomeCliente: "TESTE LUCCA",
    documento: "422.817.188-59",
    valorSolicitado: "R$ 500,00"
  },
  {
    numero: "004935630",
    dataEnv: "04/06/2025",
    nomeCliente: "JOÃO SILVA SANTOS",
    documento: "123.456.789-00",
    valorSolicitado: "R$ 1.200,00"
  },
  {
    numero: "004935631",
    dataEnv: "03/06/2025",
    nomeCliente: "MARIA OLIVEIRA LTDA",
    documento: "12.345.678/0001-90",
    valorSolicitado: "R$ 2.500,00"
  }
];

export function FormalizacaoGarantiasContent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterProposalNumber, setFilterProposalNumber] = useState("");
  const [filterCpf, setFilterCpf] = useState("");
  const [filteredPropostas, setFilteredPropostas] = useState(propostas);

  const handlePendencias = (numeroProposta: string) => {
    navigate(`/formalizacao-garantias/${numeroProposta}`);
  };

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    applyFilters(startDate, endDate, filterProposalNumber, filterCpf);
  };

  const applyFilters = (startDate: Date | null, endDate: Date | null, proposalNumber: string, cpf: string) => {
    let filtered = propostas;

    // Filtro por número da proposta
    if (proposalNumber.trim()) {
      filtered = filtered.filter(p => p.numero.includes(proposalNumber.trim()));
    }

    // Filtro por CPF
    if (cpf.trim()) {
      filtered = filtered.filter(p => p.documento.includes(cpf.trim()));
    }

    // Filtro por data (exemplo - em uma implementação real seria comparado com as datas)
    if (startDate || endDate) {
      // Implementar lógica de filtro por data aqui
      console.log("Filtrando por período:", { startDate, endDate });
    }

    setFilteredPropostas(filtered);
  };

  const handleClearFilters = () => {
    setFilterStartDate(null);
    setFilterEndDate(null);
    setFilterProposalNumber("");
    setFilterCpf("");
    setFilteredPropostas(propostas);
  };

  const handleFilterProposalNumber = (value: string) => {
    setFilterProposalNumber(value);
    applyFilters(filterStartDate, filterEndDate, value, filterCpf);
  };

  const handleFilterCpf = (value: string) => {
    setFilterCpf(value);
    applyFilters(filterStartDate, filterEndDate, filterProposalNumber, value);
  };

  return (
    <div className="flex-1">
      <GlobalHeader 
        title="Formalização de Garantias" 
        subtitle="Gerencie propostas pendentes de documentação" 
      />

      {/* Main Content */}
      <main className="p-6">
        {/* Filtros */}
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
                        onChange={(e) => handleFilterProposalNumber(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">CPF do Emitente</label>
                      <Input
                        placeholder="Digite o CPF do emitente"
                        value={filterCpf}
                        onChange={(e) => handleFilterCpf(e.target.value)}
                      />
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
              
              <span className="text-sm text-gray-600">{filteredPropostas.length} proposta(s) encontrada(s)</span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por CPF, CNPJ ou número da proposta" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Propostas Pendentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Propostas Pendentes de Documentação</h2>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Número da Proposta</TableHead>
                <TableHead className="font-semibold text-gray-700">Data que a Proposta foi Pendenciada</TableHead>
                <TableHead className="font-semibold text-gray-700">Nome do Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">CPF/CNPJ do Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">Valor Solicitado</TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPropostas.map((proposta) => (
                <TableRow key={proposta.numero} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-blue-600 font-medium">#{proposta.numero}</span>
                  </TableCell>
                  <TableCell>{proposta.dataEnv}</TableCell>
                  <TableCell className="text-blue-600">{proposta.nomeCliente}</TableCell>
                  <TableCell>{proposta.documento}</TableCell>
                  <TableCell className="font-medium">{proposta.valorSolicitado}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handlePendencias(proposta.numero)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      Pendências
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
