
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Globe, Save, TestTube } from "lucide-react";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ConfiguracaoCallbacksContent() {
  const [urlCallback, setUrlCallback] = useState("https://api.exemplo.com/callback");
  const [callbackAtivo, setCallbackAtivo] = useState(true);
  const [token, setToken] = useState("abc123def456");
  const [timeout, setTimeout] = useState("30");
  const [tentativas, setTentativas] = useState("3");
  const [observacoes, setObservacoes] = useState("");
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const handleSalvarConfiguracao = () => {
    console.log("Salvando configuração de callback:", {
      url: urlCallback,
      ativo: callbackAtivo,
      token,
      timeout,
      tentativas,
      observacoes
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

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader title="Configuração de Callbacks" />

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Configurações de Callback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL de Callback *</Label>
                    <Input
                      id="url"
                      placeholder="https://sua-api.com/callback"
                      value={urlCallback}
                      onChange={(e) => setUrlCallback(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      URL que receberá as notificações de callback
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ativo"
                      checked={callbackAtivo}
                      onCheckedChange={setCallbackAtivo}
                    />
                    <Label htmlFor="ativo">Callback ativo</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="token">Token de Autenticação</Label>
                    <Input
                      id="token"
                      placeholder="Token para validação"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Token que será enviado no header Authorization
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeout">Timeout (segundos)</Label>
                      <Input
                        id="timeout"
                        type="number"
                        placeholder="30"
                        value={timeout}
                        onChange={(e) => setTimeout(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tentativas">Máx. Tentativas</Label>
                      <Input
                        id="tentativas"
                        type="number"
                        placeholder="3"
                        value={tentativas}
                        onChange={(e) => setTentativas(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Observações adicionais sobre a configuração..."
                      rows={3}
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Resumo da Configuração */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resumo da Configuração</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Status</Label>
                          <div className="mt-1">
                            <Badge variant={callbackAtivo ? "default" : "secondary"} className="flex items-center w-fit">
                              {callbackAtivo ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                              {callbackAtivo ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">URL Configurada</Label>
                          <p className="text-sm text-gray-600 mt-1 break-all">
                            {urlCallback || "Não configurada"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Timeout</Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {timeout || "30"} segundos
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Tentativas</Label>
                          <p className="text-sm text-gray-600 mt-1">
                            Máximo {tentativas || "3"} tentativas
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Última Atualização</Label>
                          <p className="text-sm text-gray-600 mt-1">
                            15/01/2025 às 14:30
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ações */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleSalvarConfiguracao}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!urlCallback.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Configuração
                    </Button>

                    <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={!urlCallback.trim() || !callbackAtivo}
                        >
                          <TestTube className="w-4 h-4 mr-2" />
                          Testar URL
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
                          <div className="mt-4 p-3 bg-gray-50 rounded border">
                            <p className="text-sm font-medium">URL de destino:</p>
                            <p className="text-sm text-gray-600 break-all">{urlCallback}</p>
                          </div>
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
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Estrutura do Callback</h4>
                <p className="text-sm text-blue-800 mb-2">
                  O callback será enviado via GET com a seguinte estrutura:
                </p>
                <div className="text-xs bg-white p-3 rounded border text-blue-900 overflow-x-auto">
                  <p className="mb-2">URL exemplo:</p>
                  <code className="block">
                    https://webhook.site:443/b33b59bf-1ca6-4fcd-ad19-fca898847585?proposta=482a8814-0dab-4b1b-9966-19461a94011d&situacao=2&identificador=b17277a7-4b39-4ea3-890a-658f3129dd9b
                  </code>
                  <p className="mt-3 mb-1">Parâmetros:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>proposta:</strong> UUID da proposta</li>
                    <li><strong>situacao:</strong> Código numérico da situação</li>
                    <li><strong>identificador:</strong> UUID único para cada callback</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Certifique-se de que sua URL está acessível e configurada para receber requisições GET.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
