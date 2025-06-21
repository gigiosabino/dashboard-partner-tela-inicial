
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Download } from "lucide-react";
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

export function VisualizarContratosContent() {
  const [dataInicial, setDataInicial] = useState("19/06/2025");
  const [dataFinal, setDataFinal] = useState("21/06/2025");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nomeRazaoSocial, setNomeRazaoSocial] = useState("");
  const [numeroProposta, setNumeroProposta] = useState("");

  const handleFiltrar = () => {
    console.log("Aplicando filtros...");
  };

  const handleExportarExcel = () => {
    console.log("Exportando para Excel...");
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Agenda de Recebíveis
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Incluído de</label>
              <Input
                type="date"
                value="2025-06-19"
                onChange={(e) => setDataInicial(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Até</label>
              <Input
                type="date"
                value="2025-06-21"
                onChange={(e) => setDataFinal(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">CPF/CNPJ</label>
              <Input
                placeholder=""
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Nome/Razão Social</label>
              <Input
                placeholder=""
                value={nomeRazaoSocial}
                onChange={(e) => setNomeRazaoSocial(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700">Nro. Proposta</label>
              <Input
                placeholder=""
                value={numeroProposta}
                onChange={(e) => setNumeroProposta(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleFiltrar} className="bg-blue-600 hover:bg-blue-700 w-full">
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        {/* Exportar para Excel */}
        <div className="mb-4">
          <Button
            onClick={handleExportarExcel}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar para Excel
          </Button>
        </div>

        {/* Tabela de Contratos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Proposta</TableHead>
                <TableHead className="font-semibold text-gray-700">CPF/CNPJ</TableHead>
                <TableHead className="font-semibold text-gray-700">Nome/Razão Social</TableHead>
                <TableHead className="font-semibold text-gray-700">Data de Inclusão</TableHead>
                <TableHead className="font-semibold text-gray-700">Valor Financiado R$</TableHead>
                <TableHead className="font-semibold text-gray-700">Prazo</TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.proposta} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">
                    {contrato.proposta}
                  </TableCell>
                  <TableCell>{contrato.cpfCnpj}</TableCell>
                  <TableCell className="text-blue-600">{contrato.nomeRazaoSocial}</TableCell>
                  <TableCell>{contrato.dataInclusao}</TableCell>
                  <TableCell className="font-medium">{contrato.valorFinanciado}</TableCell>
                  <TableCell>{contrato.prazo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="p-1 h-8 w-8">
                        <span className="text-xs">≡</span>
                      </Button>
                      <Button size="sm" variant="outline" className="p-1 h-8 w-8">
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
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">◀</Button>
            <Button variant="outline" size="sm">◀◀</Button>
            <Button variant="default" size="sm" className="bg-blue-600">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">4</Button>
            <Button variant="outline" size="sm">5</Button>
            <Button variant="outline" size="sm">6</Button>
            <Button variant="outline" size="sm">7</Button>
            <Button variant="outline" size="sm">8</Button>
            <Button variant="outline" size="sm">9</Button>
            <Button variant="outline" size="sm">10</Button>
            <span className="text-sm text-gray-600">...</span>
            <Button variant="outline" size="sm">▶</Button>
            <Button variant="outline" size="sm">▶▶</Button>
          </div>
          <span className="text-sm text-gray-600">Exibindo itens 1 - 10 de 2522</span>
        </div>
      </main>
    </div>
  );
}
