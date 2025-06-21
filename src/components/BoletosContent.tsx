import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, RefreshCcw, Download, Printer, MessageSquare } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlobalHeader } from "@/components/GlobalHeader";

// Dados simulados para os boletos
const boletosData = [
  {
    proposta: "46094366",
    boleto: "8194",
    tipo: "Liquidação",
    cpfCnpj: "056.206.928-33",
    nomeRazaoSocial: "CARLOS ALBERTO GALHARDO SANCHEZ",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "13/06/2025",
    credito: "",
    valorBoleto: "371,72"
  },
  {
    proposta: "46097626",
    boleto: "8195",
    tipo: "Liquidação",
    cpfCnpj: "439.180.932-04",
    nomeRazaoSocial: "GRACILENE DE OLIVEIRA SANTOS",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "",
    valorBoleto: "160,00"
  },
  {
    proposta: "46097882",
    boleto: "8196",
    tipo: "Liquidação",
    cpfCnpj: "646.361.352-53",
    nomeRazaoSocial: "JURACI SILVA DE MORAIS",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "",
    valorBoleto: "313,19"
  },
  {
    proposta: "46102924",
    boleto: "8197",
    tipo: "Liquidação",
    cpfCnpj: "085.712.678-47",
    nomeRazaoSocial: "ROSI APARECIDA FERREIRA MARQUES",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "20/06/2025",
    valorBoleto: "145,40"
  },
  {
    proposta: "47742328",
    boleto: "8198",
    tipo: "Liquidação",
    cpfCnpj: "524.541.344-20",
    nomeRazaoSocial: "MARIA JOSE GOMES MOREIRA",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "",
    valorBoleto: "168,20"
  },
  {
    proposta: "47743290",
    boleto: "8199",
    tipo: "Liquidação",
    cpfCnpj: "049.329.376-01",
    nomeRazaoSocial: "NELICE VAZ MARTINS OLIVEIRA",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "",
    valorBoleto: "297,00"
  },
  {
    proposta: "47745053",
    boleto: "8200",
    tipo: "Liquidação",
    cpfCnpj: "149.350.778-83",
    nomeRazaoSocial: "MARIA BERNADETE DOS SANTOS SILVA",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "",
    valorBoleto: "536,19"
  },
  {
    proposta: "47745221",
    boleto: "8201",
    tipo: "Liquidação",
    cpfCnpj: "066.070.278-90",
    nomeRazaoSocial: "FRANCISCA DA SILVA BIZERRA BARBOSA DA SILVA",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "06/06/2025",
    valorBoleto: "165,00"
  },
  {
    proposta: "47746377",
    boleto: "8202",
    tipo: "Liquidação",
    cpfCnpj: "833.695.380-91",
    nomeRazaoSocial: "LISIANE GONÇALVES DOS REIS",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "10/06/2025",
    valorBoleto: "402,14"
  },
  {
    proposta: "47751775",
    boleto: "8203",
    tipo: "Liquidação",
    cpfCnpj: "117.190.628-54",
    nomeRazaoSocial: "TELMA PAULA DA SILVA KUBOYAMA",
    geracao: "06/06/2025",
    vencimento: "21/06/2025",
    cancelamento: "",
    credito: "16/06/2025",
    valorBoleto: "295,20"
  }
];

export function BoletosContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(boletosData);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilter = () => {
    console.log("Aplicando filtros...");
  };

  const handleRefresh = () => {
    console.log("Atualizando dados...");
    setFilteredData(boletosData);
  };

  const handleExportExcel = () => {
    console.log("Exportando para Excel...");
  };

  const handlePrint = () => {
    console.log("Imprimindo...");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Gestão de contratos" 
        subtitle="Boletos"
      />

      <main className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleFilter}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
              
              <Button 
                onClick={handleRefresh}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleExportExcel}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <Download className="w-4 h-4 mr-2" />
              </Button>
              
              <Button 
                onClick={handlePrint}
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <Printer className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabela de Boletos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Proposta</TableHead>
                <TableHead className="text-slate-700 font-semibold">Boleto</TableHead>
                <TableHead className="text-slate-700 font-semibold">Tipo</TableHead>
                <TableHead className="text-slate-700 font-semibold">CPF/CNPJ</TableHead>
                <TableHead className="text-slate-700 font-semibold">Nome/Razão Social</TableHead>
                <TableHead className="text-slate-700 font-semibold">Geração</TableHead>
                <TableHead className="text-slate-700 font-semibold">Vencimento</TableHead>
                <TableHead className="text-slate-700 font-semibold">Cancelamento</TableHead>
                <TableHead className="text-slate-700 font-semibold">Crédito</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor Boleto</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((boleto, index) => (
                <TableRow key={index} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-medium text-slate-900">{boleto.proposta}</TableCell>
                  <TableCell className="text-slate-600">{boleto.boleto}</TableCell>
                  <TableCell className="text-slate-600">{boleto.tipo}</TableCell>
                  <TableCell className="text-slate-600">{boleto.cpfCnpj}</TableCell>
                  <TableCell className="text-slate-600 max-w-xs truncate">{boleto.nomeRazaoSocial}</TableCell>
                  <TableCell className="text-slate-600">{boleto.geracao}</TableCell>
                  <TableCell className="text-slate-600">{boleto.vencimento}</TableCell>
                  <TableCell className="text-slate-600">{boleto.cancelamento || "-"}</TableCell>
                  <TableCell className="text-slate-600">{boleto.credito || "-"}</TableCell>
                  <TableCell className="font-medium text-slate-900">{boleto.valorBoleto}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-600 hover:text-slate-800"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Informações de Geração</DialogTitle>
                            <DialogDescription>
                              Detalhes sobre como este boleto foi gerado
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-4">
                            <p className="text-sm text-slate-600">
                              Este boleto foi <strong>Gerado via API</strong>
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={handlePrint}
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-800"
                      >
                        <Printer className="w-4 h-4" />
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
            <span className="text-sm text-slate-600">Linhas por página:</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-slate-600">
              {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-slate-300"
            >
              Anterior
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={currentPage === pageNumber ? "bg-blue-600 hover:bg-blue-700" : "border-slate-300"}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              {totalPages > 5 && <span className="text-slate-400">...</span>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-300"
            >
              Próximo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
