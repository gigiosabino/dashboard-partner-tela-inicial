import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, X, Upload, Download, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data para histórico de cancelamentos
const historicoCancelamentos = [
  {
    id: 1,
    dataCancelamento: "05/06/2025 14:30",
    usuario: "João Silva",
    numeroProposta: "004935629",
    motivoErro: "Proposta já estava cancelada"
  },
  {
    id: 2,
    dataCancelamento: "04/06/2025 16:45",
    usuario: "Maria Santos",
    numeroProposta: "123456789",
    motivoErro: null
  }
];

export function CancelarPropostaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const [propostaEncontrada, setPropostaEncontrada] = useState<any>(null);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processResult, setProcessResult] = useState<any>(null);

  const handleBuscarProposta = async () => {
    if (!numeroProposta.trim()) {
      alert("Por favor, informe o número da proposta!");
      return;
    }

    setIsSearching(true);
    console.log("Buscando proposta:", numeroProposta);
    
    // Simular busca da proposta
    setTimeout(() => {
      // Simular proposta encontrada ou não encontrada
      if (numeroProposta === "004935629" || numeroProposta === "123456789") {
        setPropostaEncontrada({
          numero: numeroProposta,
          cliente: "TESTE LUCCA",
          cpf: "422.817.188-59",
          valor: "R$ 500,00",
          status: "Em análise", // Corrigido para mostrar o status real da proposta
          dataEnvio: "05/06/2025",
          valorSolicitado: "R$ 500,00",
          parceiro: "Parceiro Exemplo",
          situacao: "Em análise"
        });
      } else {
        setPropostaEncontrada(null);
        alert("Proposta não encontrada! Verifique o número informado.");
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleCancelarProposta = () => {
    if (!motivoCancelamento.trim()) {
      alert("O motivo do cancelamento é obrigatório!");
      return;
    }

    console.log("Cancelando proposta:", {
      proposta: propostaEncontrada,
      motivo: motivoCancelamento
    });
    
    alert("Proposta cancelada com sucesso!");
    
    // Limpar formulário
    setNumeroProposta("");
    setPropostaEncontrada(null);
    setMotivoCancelamento("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/vnd.ms-excel" && 
          file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
          !file.name.endsWith('.csv')) {
        alert("Por favor, selecione um arquivo Excel (.xlsx, .xls) ou CSV.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo!");
      return;
    }

    setIsProcessing(true);
    console.log("Processando arquivo:", selectedFile.name);

    // Simular processamento do arquivo
    setTimeout(() => {
      // Simular resultado do processamento
      setProcessResult({
        total: 10,
        sucessos: 8,
        erros: 2,
        detalhes: [
          { linha: 3, numero: "123456", erro: "Proposta não encontrada" },
          { linha: 7, numero: "789012", erro: "Proposta já está paga" }
        ]
      });
      setIsProcessing(false);
      alert("Processamento concluído! Verifique o histórico abaixo.");
    }, 3000);
  };

  const downloadTemplate = () => {
    // Simular download do template
    const csvContent = "Numero da Proposta,Motivo do Cancelamento\n004935629,Solicitação do cliente\n123456789,Erro na documentação";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_cancelamento_propostas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Cancelar proposta" />

      <main className="p-6">
        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
          <p className="text-red-800 font-medium">
            🚫 Atenção: Não é possível cancelar propostas que já foram pagas ou cedidas.
          </p>
        </div>

        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Cancelamento Individual</TabsTrigger>
            <TabsTrigger value="lote">Cancelamento em Lote</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                {/* Busca da Proposta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número da proposta *
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite o número da proposta"
                        value={numeroProposta}
                        onChange={(e) => setNumeroProposta(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleBuscarProposta()}
                      />
                      <Button
                        onClick={handleBuscarProposta}
                        disabled={!numeroProposta.trim() || isSearching}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md px-3"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {isSearching ? "Buscando proposta..." : "Pressione Enter ou clique na lupa para buscar"}
                    </p>
                  </div>
                </div>

                {/* Informações da Proposta Encontrada */}
                {propostaEncontrada && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-4 text-lg">Dados da Proposta</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Número</label>
                        <p className="text-blue-900 font-medium">#{propostaEncontrada.numero}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Cliente</label>
                        <p className="text-blue-900">{propostaEncontrada.cliente}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">CPF</label>
                        <p className="text-blue-900">{propostaEncontrada.cpf}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Data de Envio</label>
                        <p className="text-blue-900">{propostaEncontrada.dataEnvio}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Valor Solicitado</label>
                        <p className="text-blue-900 font-medium">{propostaEncontrada.valorSolicitado}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Situação</label>
                        <p className="text-blue-900">{propostaEncontrada.situacao}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Parceiro</label>
                        <p className="text-blue-900">{propostaEncontrada.parceiro}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Status</label>
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {propostaEncontrada.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Motivo de Cancelamento */}
                {propostaEncontrada && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo de Cancelamento *
                    </label>
                    <Textarea
                      placeholder="Descreva o motivo do cancelamento da proposta..."
                      value={motivoCancelamento}
                      onChange={(e) => setMotivoCancelamento(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Campo obrigatório. Descreva detalhadamente o motivo do cancelamento.
                    </p>
                  </div>
                )}

                {/* Botão Cancelar */}
                {propostaEncontrada && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleCancelarProposta}
                      disabled={!propostaEncontrada || !motivoCancelamento.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base"
                    >
                      <X className="w-5 h-5 mr-2" />
                      CANCELAR PROPOSTA
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lote">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Cancelamento em Lote</h3>
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Template</span>
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Selecione o arquivo de cancelamentos
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          Formatos aceitos: .xlsx, .xls, .csv
                        </span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                </div>

                {selectedFile && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-600">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                          <p className="text-xs text-blue-700">
                            Tamanho: {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleProcessFile}
                        disabled={isProcessing}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isProcessing ? "Processando..." : "Processar Arquivo"}
                      </Button>
                    </div>
                  </div>
                )}

                {processResult && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Resultado do Processamento</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-green-700">Total: </span>
                        <span className="font-medium">{processResult.total}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Sucessos: </span>
                        <span className="font-medium">{processResult.sucessos}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Erros: </span>
                        <span className="font-medium">{processResult.erros}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Histórico de Cancelamentos */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Cancelamentos</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data do Cancelamento</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Número da Proposta</TableHead>
                <TableHead>Motivo do Erro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoCancelamentos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.dataCancelamento}</TableCell>
                  <TableCell>{item.usuario}</TableCell>
                  <TableCell className="font-medium text-blue-600">#{item.numeroProposta}</TableCell>
                  <TableCell>
                    {item.motivoErro ? (
                      <span className="text-red-600">{item.motivoErro}</span>
                    ) : (
                      <span className="text-green-600">Sucesso</span>
                    )}
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
