
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import { useNavigate } from "react-router-dom";

const contratos = [
  {
    id: 1,
    numeroContrato: "2025060001",
    numeroProposta: "056939510",
    cliente: "João Silva Santos",
    cpf: "123.456.789-00",
    valorContrato: "R$ 25.000,00",
    dataAssinatura: "05/06/2025",
    situacao: "Ativo",
    parceiro: "Parceiro Alpha"
  },
  {
    id: 2,
    numeroContrato: "2025060002",
    numeroProposta: "056441261",
    cliente: "Maria Oliveira Costa",
    cpf: "987.654.321-00",
    valorContrato: "R$ 15.750,00",
    dataAssinatura: "04/06/2025",
    situacao: "Pendente",
    parceiro: "Parceiro Beta"
  },
  {
    id: 3,
    numeroContrato: "2025060003",
    numeroProposta: "056411663",
    cliente: "Carlos Eduardo Lima",
    cpf: "456.789.123-00",
    valorContrato: "R$ 32.500,00",
    dataAssinatura: "03/06/2025",
    situacao: "Finalizado",
    parceiro: "Parceiro Gamma"
  }
];

const getSituacaoVariant = (situacao: string) => {
  switch (situacao) {
    case "Ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Finalizado":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function VisualizarContratosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState("");
  const navigate = useNavigate();

  const filteredContratos = contratos.filter(contrato => {
    const matchesSearch = 
      contrato.numeroContrato.includes(searchTerm) ||
      contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.cpf.includes(searchTerm);
    
    const matchesSituacao = !situacaoFilter || contrato.situacao === situacaoFilter;
    
    return matchesSearch && matchesSituacao;
  });

  const handleViewContract = (numeroContrato: string) => {
    navigate(`/contrato-detalhes/${numeroContrato}`);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader 
        title="Visualizar Contratos" 
        subtitle="Gerencie e visualize todos os contratos cadastrados no sistema" 
      />

      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              
              <Select value={situacaoFilter} onValueChange={setSituacaoFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
              
              <span className="text-sm text-gray-600">
                {filteredContratos.length} contrato(s) encontrado(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por contrato, cliente ou CPF" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Contratos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Número do Contrato</TableHead>
                <TableHead>Número da Proposta</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Valor do Contrato</TableHead>
                <TableHead>Data de Assinatura</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead className="text-center">
                  <ExternalLink className="w-4 h-4 mx-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContratos.map((contrato) => (
                <TableRow key={contrato.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">
                    {contrato.numeroContrato}
                  </TableCell>
                  <TableCell className="font-medium">
                    #{contrato.numeroProposta}
                  </TableCell>
                  <TableCell>{contrato.cliente}</TableCell>
                  <TableCell>{contrato.cpf}</TableCell>
                  <TableCell className="font-medium">{contrato.valorContrato}</TableCell>
                  <TableCell>{contrato.dataAssinatura}</TableCell>
                  <TableCell>
                    <Badge className={`${getSituacaoVariant(contrato.situacao)} font-medium`}>
                      {contrato.situacao}
                    </Badge>
                  </TableCell>
                  <TableCell>{contrato.parceiro}</TableCell>
                  <TableCell className="text-center">
                    <Button 
                      size="sm" 
                      onClick={() => handleViewContract(contrato.numeroContrato)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-medium px-3 py-1.5 rounded-md transition-all duration-200 hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visualizar
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
