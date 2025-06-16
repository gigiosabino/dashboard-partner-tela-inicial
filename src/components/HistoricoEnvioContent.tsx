
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Filter, RefreshCw, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const historicos = [
  {
    numeroPropsota: "004935629",
    dataHora: "13/06/2025 15:29:15",
    emitente: "João Silva Santos",
    documento: "123.456.789-00",
    situacao: "Aprovada",
    notificado: "Sim",
    tentativas: 1,
    envio: "https://webhook.site:443/b33b59bf-1ca6-4fcd-ad19-fca898847585?proposta=482a8814-0dab-4b1b-9966-19461a94011d&situacao=2&identificador=b17277a7-4b39-4ea3-890a-658f3129dd9b",
    retorno: 'DtProcessado: 2025-06-13 15:29:15 - Tentativa 1: StatusCode: NotFound | Content: {"success":false,"error":{"message":"Token \\"b33b59bf-1ca6-4fcd-ad19-fca898847585\\" not found","id":""}} ||'
  },
  {
    numeroPropsota: "004935630",
    dataHora: "12/06/2025 10:15:30",
    emitente: "Ana Carolina Lima",
    documento: "987.654.321-00",
    situacao: "Finalizada",
    notificado: "Não",
    tentativas: 3,
    envio: "https://webhook.site:443/b33b59bf-1ca6-4fcd-ad19-fca898847585?proposta=123a8814-0dab-4b1b-9966-19461a94022b&situacao=5&identificador=c17277a7-4b39-4ea3-890a-658f3129ee8c",
    retorno: 'DtProcessado: 2025-06-12 10:15:30 - Tentativa 3: StatusCode: Success | Content: {"success":true,"message":"Callback processed successfully"} ||'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-500";
    case "Finalizada":
      return "bg-blue-500";
    case "Cancelada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function HistoricoEnvioContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    console.log("Atualizando histórico...");
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Histórico de Envio</span>
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
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              
              <Button variant="outline" onClick={handleRefresh} className="border-gray-300 hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
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
                <TableHead className="font-semibold text-gray-700">Número da Proposta</TableHead>
                <TableHead className="font-semibold text-gray-700">Data e Hora de Envio</TableHead>
                <TableHead className="font-semibold text-gray-700">Emitente</TableHead>
                <TableHead className="font-semibold text-gray-700">Documento Federal</TableHead>
                <TableHead className="font-semibold text-gray-700">Situação</TableHead>
                <TableHead className="font-semibold text-gray-700">Notificado?</TableHead>
                <TableHead className="font-semibold text-gray-700">Nº Tentativas</TableHead>
                <TableHead className="font-semibold text-gray-700">Envio</TableHead>
                <TableHead className="font-semibold text-gray-700">Retorno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicos.map((historico, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">#{historico.numeroPropsota}</TableCell>
                  <TableCell>{historico.dataHora}</TableCell>
                  <TableCell>{historico.emitente}</TableCell>
                  <TableCell>{historico.documento}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(historico.situacao)}`}></div>
                      <span className="text-sm">{historico.situacao}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      historico.notificado === "Sim" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {historico.notificado}
                    </span>
                  </TableCell>
                  <TableCell>{historico.tentativas}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          <Eye className="w-4 h-4 mr-1" />
                          Envio
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Envio</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                          <p className="text-sm break-all">{historico.envio}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Eye className="w-4 h-4 mr-1" />
                          Retorno
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Retorno</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                          <p className="text-sm break-all">{historico.retorno}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
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
