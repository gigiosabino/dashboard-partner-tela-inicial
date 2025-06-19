
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const historicoCallbacks = [
  {
    id: 1,
    numeroProposta: "056939510",
    evento: "Aprovada",
    dataEnvio: "05/06/2025 14:30:15",
    situacao: "Sucesso",
    tentativas: 1,
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?proposta=056939510&situacao=2&identificador=02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 14:30:45 - Tentativa 1: StatusCode: OK | Content: This URL has no default content configured. <a href=\"https://webhook.site/#!/edit/4b6c3112-5f26-477e-b679-d2a7e295dc0f\">Change response in Webhook.site</a>. ||;"
  },
  {
    id: 2,
    numeroProposta: "056441261",
    evento: "Finalizada",
    dataEnvio: "05/06/2025 13:25:42",
    situacao: "Erro",
    tentativas: 3,
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?proposta=056441261&situacao=4&identificador=02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 13:25:45 - Tentativa 3: StatusCode: 500 | Content: Internal Server Error ||;"
  },
  {
    id: 3,
    numeroProposta: "056411663",
    evento: "Paga",
    dataEnvio: "04/06/2025 16:45:30",
    situacao: "Sucesso",
    tentativas: 1,
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?proposta=056411663&situacao=8&identificador=02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-04 16:45:32 - Tentativa 1: StatusCode: OK | Content: This URL has no default content configured. <a href=\"https://webhook.site/#!/edit/4b6c3112-5f26-477e-b679-d2a7e295dc0f\">Change response in Webhook.site</a>. ||;"
  },
  {
    id: 4,
    numeroProposta: "056386138",
    evento: "Liberada",
    dataEnvio: "04/06/2025 10:15:22",
    situacao: "Erro",
    tentativas: 2,
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?proposta=056386138&situacao=6&identificador=02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-04 10:15:25 - Tentativa 2: StatusCode: Timeout | Content: Request timeout ||;"
  }
];

const getSituacaoVariant = (situacao: string) => {
  switch (situacao) {
    case "Sucesso":
      return "outline";
    case "Erro":
      return "destructive";
    default:
      return "secondary";
  }
};

export function HistoricoEnvioContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [numeroPropostaFilter, setNumeroPropostaFilter] = useState("");

  const filteredHistorico = historicoCallbacks.filter(callback => {
    const matchesSearch = 
      callback.numeroProposta.includes(searchTerm) ||
      callback.evento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNumeroProposta = !numeroPropostaFilter || callback.numeroProposta.includes(numeroPropostaFilter);
    
    // Filtro de data (simplificado para o exemplo)
    const matchesData = true; // Implementar filtro de data real conforme necessário
    
    return matchesSearch && matchesNumeroProposta && matchesData;
  });

  const handleLimparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
    setNumeroPropostaFilter("");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader 
        title="Histórico de Envio de Callbacks" 
        subtitle="Acompanhe todos os callbacks enviados para sua integração" 
      />

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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                        <Input
                          type="date"
                          value={dataInicial}
                          onChange={(e) => setDataInicial(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data Final</label>
                        <Input
                          type="date"
                          value={dataFinal}
                          onChange={(e) => setDataFinal(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Número da Proposta</label>
                      <Input
                        placeholder="Digite o número da proposta"
                        value={numeroPropostaFilter}
                        onChange={(e) => setNumeroPropostaFilter(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleLimparFiltros}
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
                {filteredHistorico.length} callback(s) encontrado(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por número da proposta ou evento" 
                className="pl-10 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Histórico */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número Proposta</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Data e Hora de Envio</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Tentativas</TableHead>
                <TableHead>Envio</TableHead>
                <TableHead>Retorno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistorico.map((callback) => (
                <TableRow key={callback.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">#{callback.numeroProposta}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {callback.evento}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{callback.dataEnvio}</TableCell>
                  <TableCell>
                    <Badge variant={getSituacaoVariant(callback.situacao)}>
                      {callback.situacao}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${callback.tentativas > 1 ? 'text-orange-600' : 'text-green-600'}`}>
                      {callback.tentativas}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Envio
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Requisição de Envio - Proposta #{callback.numeroProposta}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-700 block mb-2">URL de Envio:</label>
                          <div className="bg-gray-50 p-3 rounded border text-sm break-all">
                            {callback.envio}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Retorno
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Retorno da Requisição - Proposta #{callback.numeroProposta}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-700 block mb-2">Resposta do Callback:</label>
                          <div className="bg-gray-50 p-3 rounded border text-sm">
                            {callback.retorno}
                          </div>
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
