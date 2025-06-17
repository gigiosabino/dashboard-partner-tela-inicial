
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { useState } from "react";

const propostas = [
  {
    numero: "004935629",
    dataEnv: "05/06/2025",
    nomeCliente: "TESTE LUCCA",
    documento: "422.817.188-59",
    valorSolicitado: "R$ 500,00",
    status: "Ativa"
  },
  {
    numero: "004935630",
    dataEnv: "04/06/2025",
    nomeCliente: "JOÃO SILVA SANTOS",
    documento: "123.456.789-00",
    valorSolicitado: "R$ 1.200,00",
    status: "Ativa"
  },
  {
    numero: "004935631",
    dataEnv: "03/06/2025",
    nomeCliente: "MARIA OLIVEIRA LTDA",
    documento: "12.345.678/0001-90",
    valorSolicitado: "R$ 2.500,00",
    status: "Ativa"
  }
];

export function CancelarPropostaContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCancelar = (numeroProposta: string) => {
    console.log("Cancelando proposta:", numeroProposta);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Cancelamento de Proposta</h1>
              <p className="text-sm text-gray-600">Gerencie o cancelamento de propostas ativas</p>
            </div>
          </div>
        </div>
      </header>

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
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option>Todas</option>
                        <option>Ativa</option>
                        <option>Cancelada</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button variant="outline" size="sm">
                        Limpar
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <span className="text-sm text-gray-600">{propostas.length} proposta(s) encontrada(s)</span>
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

        {/* Propostas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Propostas Ativas</h2>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Número da Proposta</TableHead>
                <TableHead className="font-semibold text-gray-700">Data de Envio</TableHead>
                <TableHead className="font-semibold text-gray-700">Nome do Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">CPF/CNPJ do Cliente</TableHead>
                <TableHead className="font-semibold text-gray-700">Valor Solicitado</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propostas.map((proposta) => (
                <TableRow key={proposta.numero} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-blue-600 font-medium">#{proposta.numero}</span>
                  </TableCell>
                  <TableCell>{proposta.dataEnv}</TableCell>
                  <TableCell className="text-blue-600">{proposta.nomeCliente}</TableCell>
                  <TableCell>{proposta.documento}</TableCell>
                  <TableCell className="font-medium">{proposta.valorSolicitado}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {proposta.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleCancelar(proposta.numero)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                    >
                      Cancelar
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
