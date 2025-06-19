
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye } from "lucide-react";
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
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalHeader } from "@/components/GlobalHeader";

const propostas = [
  {
    numero: "056939510",
    dataEnv: "05/06/2025",
    nomeCliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documento: "077.445.417-23",
    valorSolicitado: "R$ 20.000,00",
    status: "Cedida",
    parceiro: "Parceiro A"
  },
  {
    numero: "056441261",
    dataEnv: "04/06/2025",
    nomeCliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    status: "Em Análise",
    parceiro: "Parceiro B"
  },
  {
    numero: "056411663",
    dataEnv: "03/06/2025",
    nomeCliente: "BETANIA MARIA SILVA DE LIRA",
    documento: "066.742.374-50",
    valorSolicitado: "R$ 2.946.000,00",
    status: "Paga",
    parceiro: "Parceiro A"
  },
  {
    numero: "056386138",
    dataEnv: "02/06/2025",
    nomeCliente: "JOÃO CARLOS SANTOS",
    documento: "111.222.333-44",
    valorSolicitado: "R$ 117.500,00",
    status: "Pendente Pagamento",
    parceiro: "Parceiro C"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Cedida":
      return "default";
    case "Em Análise":
      return "secondary";
    case "Paga":
      return "outline";
    case "Pendente Pagamento":
      return "destructive";
    default:
      return "secondary";
  }
};

export function PropostasContent() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pega o filtro de status da URL se existir
  useEffect(() => {
    const statusFromUrl = searchParams.get('status');
    if (statusFromUrl) {
      const statusMap: { [key: string]: string } = {
        "paga": "Paga",
        "cedida": "Cedida",
        "pendente-pagamento": "Pendente Pagamento"
      };
      setStatusFilter(statusMap[statusFromUrl] || "");
    }
  }, [searchParams]);

  const filteredPropostas = propostas.filter(proposta => {
    const matchesSearch = 
      proposta.numero.includes(searchTerm) ||
      proposta.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposta.documento.includes(searchTerm);
    
    const matchesStatus = statusFilter === "" || proposta.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Propostas Contratadas" subtitle="Gerencie todas as propostas contratadas" />

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
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">Todas</option>
                        <option value="Paga">Paga</option>
                        <option value="Cedida">Cedida</option>
                        <option value="Pendente Pagamento">Pendente Pagamento</option>
                        <option value="Em Análise">Em Análise</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setStatusFilter("")}
                      >
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span className="text-sm text-gray-600">
                {filteredPropostas.length} proposta(s) encontrada(s)
                {statusFilter && ` com status "${statusFilter}"`}
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por CPF, nome do cliente ou número da proposta" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Propostas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Data Envio</TableHead>
                <TableHead>Nome Cliente</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Valor Solicitado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPropostas.map((proposta) => (
                <TableRow key={proposta.numero} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">#{proposta.numero}</TableCell>
                  <TableCell>{proposta.dataEnv}</TableCell>
                  <TableCell>{proposta.nomeCliente}</TableCell>
                  <TableCell>{proposta.documento}</TableCell>
                  <TableCell className="font-medium">{proposta.valorSolicitado}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(proposta.status)}>
                      {proposta.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{proposta.parceiro}</TableCell>
                  <TableCell>
                    <Link to={`/propostas/${proposta.numero}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </Link>
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
