
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar } from "lucide-react";
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
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const historicoCallbacks = [
  {
    id: 1,
    numeroProposta: "056939510",
    evento: "Aprovada",
    dataEnvio: "05/06/2025 14:30:15",
    situacao: "Enviado",
    url: "https://api.parceiro.com/callback",
    tentativas: 1,
    ultimaResposta: "200 - OK"
  },
  {
    id: 2,
    numeroProposta: "056441261",
    evento: "Em Análise",
    dataEnvio: "05/06/2025 13:25:42",
    situacao: "Erro",
    url: "https://api.parceiro.com/callback",
    tentativas: 3,
    ultimaResposta: "500 - Internal Server Error"
  },
  {
    id: 3,
    numeroProposta: "056411663",
    evento: "Paga",
    dataEnvio: "04/06/2025 16:45:30",
    situacao: "Enviado",
    url: "https://api.parceiro.com/callback",
    tentativas: 1,
    ultimaResposta: "200 - OK"
  },
  {
    id: 4,
    numeroProposta: "056386138",
    evento: "Cedida",
    dataEnvio: "04/06/2025 10:15:22",
    situacao: "Pendente",
    url: "https://api.parceiro.com/callback",
    tentativas: 2,
    ultimaResposta: "Timeout"
  }
];

const getSituacaoVariant = (situacao: string) => {
  switch (situacao) {
    case "Enviado":
      return "outline";
    case "Erro":
      return "destructive";
    case "Pendente":
      return "secondary";
    default:
      return "secondary";
  }
};

export function HistoricoEnvioContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const filteredHistorico = historicoCallbacks.filter(callback => {
    const matchesSearch = 
      callback.numeroProposta.includes(searchTerm) ||
      callback.evento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSituacao = situacaoFilter === "" || callback.situacao === situacaoFilter;
    
    // Filtro de data (simplificado para o exemplo)
    const matchesData = true; // Implementar filtro de data real conforme necessário
    
    return matchesSearch && matchesSituacao && matchesData;
  });

  const handleLimparFiltros = () => {
    setSituacaoFilter("");
    setDataInicial("");
    setDataFinal("");
    setSearchTerm("");
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros Avançados
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 bg-white p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Situação do Callback</label>
                      <Select value={situacaoFilter} onValueChange={setSituacaoFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a situação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todas</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Erro">Erro</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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

          {/* Filtros Rápidos */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filtros rápidos:</span>
            <Button
              variant={situacaoFilter === "Enviado" ? "default" : "outline"}
              size="sm"
              onClick={() => setSituacaoFilter(situacaoFilter === "Enviado" ? "" : "Enviado")}
            >
              Enviados
            </Button>
            <Button
              variant={situacaoFilter === "Erro" ? "destructive" : "outline"}
              size="sm"
              onClick={() => setSituacaoFilter(situacaoFilter === "Erro" ? "" : "Erro")}
            >
              Com Erro
            </Button>
            <Button
              variant={situacaoFilter === "Pendente" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSituacaoFilter(situacaoFilter === "Pendente" ? "" : "Pendente")}
            >
              Pendentes
            </Button>
          </div>
        </div>

        {/* Tabela de Histórico */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número Proposta</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Data/Hora Envio</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>URL Destino</TableHead>
                <TableHead>Tentativas</TableHead>
                <TableHead>Última Resposta</TableHead>
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
                  <TableCell className="text-sm text-gray-600 max-w-48 truncate" title={callback.url}>
                    {callback.url}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${callback.tentativas > 1 ? 'text-orange-600' : 'text-green-600'}`}>
                      {callback.tentativas}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className={`${
                      callback.ultimaResposta.startsWith('200') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {callback.ultimaResposta}
                    </span>
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
