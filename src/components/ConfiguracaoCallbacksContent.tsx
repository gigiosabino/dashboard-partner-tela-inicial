import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Save, TestTube, Settings } from "lucide-react";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const tiposCallback = [
  { value: "proposta", label: "Proposta" },
  { value: "fgts", label: "FGTS" },
  { value: "agenda-recebiveis", label: "Agenda recebíveis" },
  { value: "proposta-lancamento-split", label: "Proposta Lançamento (split)" }
];

const integracoes = [
  { value: "integracao-1", label: "Integração Principal" },
  { value: "integracao-2", label: "Integração Secundária" },
  { value: "integracao-3", label: "Integração de Teste" }
];

const metodosAutenticacao = [
  { value: "bearer-token", label: "Bearer Token" },
  { value: "api-key", label: "API Key" },
  { value: "basic-authentication", label: "Basic Authentication" },
  { value: "x-api-key", label: "X-API-Key" },
  { value: "jwt", label: "JWT (JSON Web Token)" },
  { value: "hmac", label: "HMAC (Hash-based Message Authentication Code)" }
];

const eventos = [
  "Em Digitação",
  "Em Analise",
  "Aprovada",
  "Recusada",
  "Cancelada",
  "Pendente",
  "Finalizada",
  "Conferida",
  "Liberada",
  "Paga",
  "Cedida",
  "Pendente pagamento",
  "Aviso cancelamento",
  "Pendente documento"
];

// Mock data para o histórico
const historicoConfiguracoes = [
  {
    id: 1,
    usuario: "João Silva",
    dataHora: "15/01/2025 14:30",
    url: "https://api.exemplo.com/callback",
    metodo: "POST",
    autenticacao: "Bearer",
    chave: "abc123***",
    statusSelecionado: "Aprovada, Recusada, Cancelada"
  },
  {
    id: 2,
    usuario: "Maria Santos",
    dataHora: "14/01/2025 09:15",
    url: "https://webhook.exemplo.com/notify",
    metodo: "GET",
    autenticacao: "API Key",
    chave: "xyz789***",
    statusSelecionado: "Em Analise, Pendente, Finalizada"
  }
];

export function ConfiguracaoCallbacksContent() {
  const [tipoCallback, setTipoCallback] = useState("");
  const [integracao, setIntegracao] = useState("");
  const [urlCallback, setUrlCallback] = useState("");
  const [metodoEnvio, setMetodoEnvio] = useState("");
  const [autenticacao, setAutenticacao] = useState("");
  const [chave, setChave] = useState("");
  const [eventosSelecionados, setEventosSelecionados] = useState<string[]>([]);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const handleEventoChange = (evento: string, checked: boolean) => {
    if (checked) {
      setEventosSelecionados([...eventosSelecionados, evento]);
    } else {
      setEventosSelecionados(eventosSelecionados.filter(e => e !== evento));
    }
  };

  const handleSalvarConfiguracao = () => {
    console.log("Salvando configuração de callback:", {
      tipoCallback,
      integracao,
      urlCallback,
      metodoEnvio,
      autenticacao,
      chave,
      eventosSelecionados
    });
    alert("Configuração salva com sucesso!");
  };

  const handleTestarCallback = async () => {
    setIsTestRunning(true);
    console.log("Testando callback...");
    
    // Simular teste
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsTestRunning(false);
    setIsTestDialogOpen(false);
    alert("Teste enviado com sucesso! Verifique se o callback foi recebido em sua URL.");
  };

  const isFormValid = tipoCallback && integracao && urlCallback && metodoEnvio && eventosSelecionados.length > 0;

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Configuração de Callbacks" />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Formulário de Configuração */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Nova Configuração de Callback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo-callback">Tipo de Callback *</Label>
                  <Select value={tipoCallback} onValueChange={setTipoCallback}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de callback" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCallback.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="integracao">Integração *</Label>
                  <Select value={integracao} onValueChange={setIntegracao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a integração" />
                    </SelectTrigger>
                    <SelectContent>
                      {integracoes.map((int) => (
                        <SelectItem key={int.value} value={int.value}>
                          {int.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url-callback">URL de Callback *</Label>
                  <Input
                    id="url-callback"
                    placeholder="https://sua-api.com/callback"
                    value={urlCallback}
                    onChange={(e) => setUrlCallback(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metodo-envio">Método de Envio *</Label>
                  <Select value={metodoEnvio} onValueChange={setMetodoEnvio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autenticacao">Autenticação</Label>
                  <Select value={autenticacao} onValueChange={setAutenticacao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de autenticação" />
                    </SelectTrigger>
                    <SelectContent>
                      {metodosAutenticacao.map((metodo) => (
                        <SelectItem key={metodo.value} value={metodo.value}>
                          {metodo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chave">Chave</Label>
                  <Input
                    id="chave"
                    placeholder="Chave de autenticação"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                  />
                </div>
              </div>

              {/* Seleção de Eventos */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Eventos para Envio *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventos.map((evento) => (
                    <div key={evento} className="flex items-center space-x-2">
                      <Checkbox
                        id={`evento-${evento}`}
                        checked={eventosSelecionados.includes(evento)}
                        onCheckedChange={(checked) => handleEventoChange(evento, checked as boolean)}
                      />
                      <Label
                        htmlFor={`evento-${evento}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {evento}
                      </Label>
                    </div>
                  ))}
                </div>
                {eventosSelecionados.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {eventosSelecionados.length} evento(s) selecionado(s)
                  </p>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!isFormValid}
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Testar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <span>Teste de Callback</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-gray-700 mb-4">
                        <strong>Atenção:</strong> Este teste enviará um callback com valores fictícios nos parâmetros proposta, situação e identificador.
                      </p>
                      <p className="text-gray-600 text-sm">
                        O objetivo é apenas validar se sua URL está recebendo corretamente o callback enviado pelo sistema.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsTestDialogOpen(false)}
                        disabled={isTestRunning}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleTestarCallback}
                        disabled={isTestRunning}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        {isTestRunning ? "Enviando..." : "Enviar Teste"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleSalvarConfiguracao}
                  disabled={!isFormValid}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configuração
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Configurações */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Data e Hora</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Autenticação</TableHead>
                      <TableHead>Chave</TableHead>
                      <TableHead>Status Selecionado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicoConfiguracoes.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-medium">{config.usuario}</TableCell>
                        <TableCell>{config.dataHora}</TableCell>
                        <TableCell className="max-w-xs truncate" title={config.url}>
                          {config.url}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            config.metodo === 'POST' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {config.metodo}
                          </span>
                        </TableCell>
                        <TableCell>{config.autenticacao}</TableCell>
                        <TableCell>{config.chave}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={config.statusSelecionado}>
                            {config.statusSelecionado}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
