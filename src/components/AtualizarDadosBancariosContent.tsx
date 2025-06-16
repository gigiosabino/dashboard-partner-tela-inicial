import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Filter, RefreshCw, Download, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Dados mockados para demonstração
const propostas = [
  {
    numero: "056939510",
    dataCriacao: "11/06/2025",
    vendedor: "Jonathan Marks Nevis",
    cliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    documento: "077.445.417-23",
    valorSolicitado: "R$ 20.000,00",
    valorAprovado: "R$ 20.000,00",
    parcelas: "36",
    situacao: "Cedida"
  },
  {
    numero: "056441261",
    dataCriacao: "05/06/2025",
    vendedor: "Willian Buthi",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "4",
    situacao: "Cancelada"
  },
  {
    numero: "056411663",
    dataCriacao: "04/06/2025",
    vendedor: "Nadia Nicacio",
    cliente: "BETANIA MARIA SILVA DE LIRA",
    documento: "066742374500",
    valorSolicitado: "R$ 2.946.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "4",
    situacao: "Cancelada"
  },
  {
    numero: "056386138",
    dataCriacao: "04/06/2025",
    vendedor: "Willian Buthi",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 117.500,00",
    valorAprovado: "R$ 0,00",
    parcelas: "18",
    situacao: "Cancelada"
  },
  {
    numero: "056363241",
    dataCriacao: "04/06/2025",
    vendedor: "Jonathan Marks Nevis",
    cliente: "BMP MONEY PLUS",
    documento: "123.983.910-35",
    valorSolicitado: "R$ 1.000,00",
    valorAprovado: "R$ 0,00",
    parcelas: "5",
    situacao: "Em Análise"
  },
  {
    numero: "056362606",
    dataCriacao: "04/06/2025",
    vendedor: "Bruna Clevelares Moretto",
    cliente: "FABY MODA FITNESS & CASUAL LTDA",
    documento: "24.110.339/0001-09",
    valorSolicitado: "R$ 7.000,00",
    valorAprovado: "R$ 7.000,00",
    parcelas: "24",
    situacao: "Cedida"
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

export function AtualizarDadosBancariosContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    console.log("Atualizando listagem...");
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Atualizar Dados Bancários</span>
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
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nova Atualização
              </Button>
              
              <Button variant="outline" onClick={handleRefresh} className="border-gray-300 hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>

              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
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

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">#</TableHead>
                <TableHead className="font-semibold text-gray-700">Situação</TableHead>
                <TableHead className="font-semibold text-gray-700">Rev.</TableHead>
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
                  <TableCell className="text-sm text-gray-600">-</TableCell>
                  <TableCell className="text-sm">{proposta.vendedor}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.cliente}</div>
                      <div className="text-sm text-gray-500">{proposta.documento}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.valorSolicitado}</div>
                      <div className="text-sm text-gray-500">Em {proposta.parcelas} parcelas</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposta.valorAprovado}</div>
                      <div className="text-sm text-gray-500">Em {proposta.parcelas} parcelas</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
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
