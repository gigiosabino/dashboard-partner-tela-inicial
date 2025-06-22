
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const callbackExamples = {
  proposta: {
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?proposta=056939510&situacao=2&identificador=02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 14:30:45 - Tentativa 1: StatusCode: OK | Content: This URL has no default content configured. <a href=\"https://webhook.site/#!/edit/4b6c3112-5f26-477e-b679-d2a7e295dc0f\">Change response in Webhook.site</a>. ||;"
  },
  fgts: {
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?fgts=FG123456789&situacao=aprovado&valor=15000.00&identificador=fgts-02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 14:30:45 - Tentativa 1: StatusCode: OK | Content: FGTS processado com sucesso - Valor liberado: R$ 15.000,00 ||;"
  },
  split: {
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?split=SPL987654321&parcela=3&valor=5000.00&status=processado&identificador=split-02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 14:30:45 - Tentativa 1: StatusCode: OK | Content: Split processado - Parcela 3 de 12 - Valor: R$ 5.000,00 ||;"
  },
  agenda: {
    envio: "https://webhook.site/4b6c3112-5f26-477e-b679-d2a7e295dc0f?agenda=AGR456789123&vencimento=2025-07-15&valor=8500.00&status=agendado&identificador=agenda-02122717-6879-43d4-b07b-6225df9e820f",
    retorno: "DtProcessado: 2025-06-05 14:30:45 - Tentativa 1: StatusCode: OK | Content: Agenda de recebíveis processada - Vencimento: 15/07/2025 - Valor: R$ 8.500,00 ||;"
  }
};

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
  const [statusFilter, setStatusFilter] = useState("");
  const [tipoCallback, setTipoCallback] = useState("proposta");

  const filteredHistorico = historicoCallbacks.filter(callback => {
    const matchesSearch = 
      callback.numeroProposta.includes(searchTerm) ||
      callback.evento.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por número da proposta específico (ignora período quando preenchido)
    const matchesNumeroProposta = !numeroPropostaFilter || callback.numeroProposta.includes(numeroPropostaFilter);
    
    // Filtro por status
    const matchesStatus = !statusFilter || callback.situacao === statusFilter;
    
    // Filtro de data (ignorado se número da proposta estiver preenchido)
    let matchesData = true;
    if (!numeroPropostaFilter && (dataInicial || dataFinal)) {
      // Implementar filtro de data real conforme necessário
      const callbackDate = new Date(callback.dataEnvio.split(' ')[0].split('/').reverse().join('-'));
      const startDate = dataInicial ? new Date(dataInicial) : null;
      const endDate = dataFinal ? new Date(dataFinal) : null;
      
      if (startDate && callbackDate < startDate) matchesData = false;
      if (endDate && callbackDate > endDate) matchesData = false;
    }
    
    return matchesSearch && matchesNumeroProposta && matchesStatus && matchesData;
  });

  const handleLimparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
    setNumeroPropostaFilter("");
    setStatusFilter("");
  };

  const getCallbackExample = (type: string) => {
    return callbackExamples[type as keyof typeof callbackExamples] || callbackExamples.proposta;
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Histórico de Envio de Callbacks" 
        subtitle="Acompanhe todos os callbacks enviados para sua integração" 
      />

      <main className="p-6">
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
                        <label className="text-sm font-medium mb-2 block text-slate-700">Data Inicial</label>
                        <Input
                          type="date"
                          value={dataInicial}
                          onChange={(e) => setDataInicial(e.target.value)}
                          className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block text-slate-700">Data Final</label>
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
                      <p className="text-xs text-slate-500 mt-1">
                        Ignora o período quando preenchido
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="border-slate-300 focus:border-blue-600 focus:ring-blue-600">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-200 bg-white shadow-lg">
                          <SelectItem value="Sucesso" className="text-slate-700 hover:bg-slate-50">Sucesso</SelectItem>
                          <SelectItem value="Erro" className="text-slate-700 hover:bg-slate-50">Erro</SelectItem>
                        </SelectContent>
                      </Select>
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

              <div className="w-48">
                <Select value={tipoCallback} onValueChange={setTipoCallback}>
                  <SelectTrigger className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm">
                    <SelectValue placeholder="Tipo de callback" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 bg-white shadow-lg">
                    <SelectItem value="proposta" className="text-slate-700 hover:bg-slate-50">Proposta</SelectItem>
                    <SelectItem value="fgts" className="text-slate-700 hover:bg-slate-50">FGTS</SelectItem>
                    <SelectItem value="split" className="text-slate-700 hover:bg-slate-50">Split</SelectItem>
                    <SelectItem value="agenda" className="text-slate-700 hover:bg-slate-50">Agenda recebíveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                {filteredHistorico.length} callback(s) encontrado(s)
              </span>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por número da proposta ou evento" 
                className="pl-10 border-slate-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Histórico */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Número Proposta</TableHead>
                <TableHead className="text-slate-700 font-semibold">Evento</TableHead>
                <TableHead className="text-slate-700 font-semibold">Data e Hora de Envio</TableHead>
                <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
                <TableHead className="text-slate-700 font-semibold">Tentativas</TableHead>
                <TableHead className="text-slate-700 font-semibold">Envio</TableHead>
                <TableHead className="text-slate-700 font-semibold">Retorno</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistorico.map((callback) => (
                <TableRow key={callback.id} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-medium text-blue-700">#{callback.numeroProposta}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {callback.evento}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{callback.dataEnvio}</TableCell>
                  <TableCell>
                    <Badge variant={getSituacaoVariant(callback.situacao)} className={
                      callback.situacao === "Sucesso" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : callback.situacao === "Erro"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : ""
                    }>
                      {callback.situacao}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${callback.tentativas > 1 ? 'text-amber-600' : 'text-green-600'}`}>
                      {callback.tentativas}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-[#005f73] hover:bg-[#004a5c] text-white border-[#005f73] shadow-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Envio
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-slate-200 shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-slate-900">Requisição de Envio - Proposta #{callback.numeroProposta}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <label className="text-sm font-medium text-slate-700 block mb-2">URL de Envio:</label>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm break-all text-slate-700">
                            {getCallbackExample(tipoCallback).envio}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-[#80b918] hover:bg-[#6ba016] text-white border-[#80b918] shadow-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Retorno
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-slate-200 shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-slate-900">Retorno da Requisição - Proposta #{callback.numeroProposta}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <label className="text-sm font-medium text-slate-700 block mb-2">Resposta do Callback:</label>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700">
                            {getCallbackExample(tipoCallback).retorno}
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
