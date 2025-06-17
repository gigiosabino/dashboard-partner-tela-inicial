import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { useState } from "react";
import { History, AlertTriangle } from "lucide-react";

const eventos = [
  { nome: "Em Digitação", quantidade: 0, selecionado: false },
  { nome: "Recusada", quantidade: 3, selecionado: true },
  { nome: "Finalizada", quantidade: 6, selecionado: true },
  { nome: "Paga", quantidade: 9, selecionado: true },
  { nome: "Pendente Documento", quantidade: 0, selecionado: false },
  { nome: "Em Análise", quantidade: 1, selecionado: true },
  { nome: "Cancelada", quantidade: 2, selecionado: true },
  { nome: "Conferida", quantidade: 7, selecionado: true },
  { nome: "Cedida", quantidade: 10, selecionado: true },
  { nome: "Aviso Cancelamento", quantidade: 0, selecionado: false },
  { nome: "Aprovada", quantidade: 2, selecionado: true },
  { nome: "Pendente", quantidade: 5, selecionado: true },
  { nome: "Liberada", quantidade: 8, selecionado: true },
  { nome: "Pendente Pagamento", quantidade: 11, selecionado: true },
  { nome: "Aviso Situação Pagamento", quantidade: 0, selecionado: false },
];

const historico = [
  {
    usuario: "Nome Sobrenome 1 - usuario1@gmail.com",
    dataHora: "25/01/2025 - 15:36",
    url: "https://webhook.site/111111-111111-111111-111?propostas={PROPOSTA}&situacao={SITUACAO}&identificador={IDENTIFICADOR}",
    metodo: "POST",
    autenticacao: "Authorization",
    chave: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    status: "Aprovada, Finalizada, Liberada"
  },
  {
    usuario: "Nome Sobrenome 2 - usuario2@gmail.com",
    dataHora: "17/06/2024 - 19:27",
    url: "https://webhook.site/111111-111111-111111-111?propostas={PROPOSTA}&situacao={SITUACAO}&identificador={IDENTIFICADOR}",
    metodo: "POST",
    autenticacao: "Authorization",  
    chave: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    status: "Aprovada, Finalizada, Liberada, Paga, Cedida"
  }
];

export function ConfiguracaoCallbacksContent() {
  const [integracao, setIntegracao] = useState("TESTE G");
  const [metodo, setMetodo] = useState("POST");
  const [url, setUrl] = useState("https://webhook.site:443/b33b59bf-1ca6-4fcd-ad19-fca898847585");
  const [parametros, setParametros] = useState("proposta={PROPOSTA}&situacao={SITUACAO}&identificador={IDENTIFICADOR}");
  const [tipoAutenticacao, setTipoAutenticacao] = useState("Authorization");
  const [chaveAutenticacao, setChaveAutenticacao] = useState("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
  const [eventosSelecionados, setEventosSelecionados] = useState(eventos);
  const [showTestAlert, setShowTestAlert] = useState(false);

  const handleEventoChange = (index: number, checked: boolean) => {
    const novosEventos = [...eventosSelecionados];
    novosEventos[index].selecionado = checked;
    setEventosSelecionados(novosEventos);
  };

  const totalSelecionados = eventosSelecionados.filter(evento => evento.selecionado).length;
  const urlFinal = `${url}?${parametros}`;

  const handleSalvarConfiguracao = () => {
    console.log("Salvando configuração de callback...");
    alert("Configuração salva com sucesso!");
  };

  const handleTestarUrl = () => {
    if (!url.trim()) {
      alert("Por favor, configure uma URL antes de testar.");
      return;
    }
    setShowTestAlert(true);
  };

  const handleConfirmarTeste = () => {
    console.log("Enviando callback de teste para:", urlFinal);
    setShowTestAlert(false);
    
    // Simular envio do callback de teste
    setTimeout(() => {
      alert("Callback de teste enviado com sucesso!");
    }, 1000);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Configuração de Callbacks</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Configuração Principal - 2/3 da largura */}
          <div className="col-span-2 space-y-6">
            {/* Configuração do Callback */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-6">Configuração do Callback</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Integração:</label>
                  <Select value={integracao} onValueChange={setIntegracao}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TESTE G">TESTE G</SelectItem>
                      <SelectItem value="TESTE A">TESTE A</SelectItem>
                      <SelectItem value="TESTE B">TESTE B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Método:</label>
                  <Select value={metodo} onValueChange={setMetodo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL:</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL do endpoint"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parâmetros:</label>
                  <Input
                    value={parametros}
                    onChange={(e) => setParametros(e.target.value)}
                    placeholder="Parâmetros da URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Autenticação:</label>
                  <Select value={tipoAutenticacao} onValueChange={setTipoAutenticacao}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Authorization">Authorization</SelectItem>
                      <SelectItem value="API Key">API Key</SelectItem>
                      <SelectItem value="Basic Auth">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chave de Autenticação:</label>
                  <Input
                    value={chaveAutenticacao}
                    onChange={(e) => setChaveAutenticacao(e.target.value)}
                    placeholder="Chave de autenticação"
                    type="password"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Final:</label>
                <div className="text-sm text-gray-600 break-all font-mono bg-white p-2 rounded border">
                  {urlFinal}
                </div>
              </div>
            </div>

            {/* Eventos para Notificação */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Eventos para Notificação</h2>
                <span className="text-sm text-blue-600">{totalSelecionados} selecionados</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Selecione quais eventos devem disparar o callback</p>

              <div className="grid grid-cols-3 gap-4">
                {eventosSelecionados.map((evento, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={evento.selecionado}
                      onCheckedChange={(checked) => handleEventoChange(index, checked as boolean)}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium">{evento.nome}</span>
                      <span className="ml-2 text-xs text-gray-500">({evento.quantidade})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo da Configuração - 1/3 da largura */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Resumo da Configuração</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Integração:</span>
                  <p className="text-gray-600">{integracao}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Método:</span>
                  <p className="text-gray-600">{metodo}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">URL:</span>
                  <p className="text-gray-600 break-all font-mono text-xs">{url || "Não configurada"}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Autenticação:</span>
                  <p className="text-gray-600">{tipoAutenticacao}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Eventos:</span>
                  <p className="text-gray-600">{totalSelecionados} eventos selecionados</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={handleSalvarConfiguracao}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Salvar Configuração
                </Button>
                
                <Button 
                  onClick={handleTestarUrl}
                  variant="outline" 
                  className="w-full border-gray-300"
                >
                  Testar URL
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert de Teste */}
        {showTestAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Atenção</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Este teste enviará um callback com valores fictícios nos parâmetros proposta, situacao e identificador.
                    <br/><br/>
                    O objetivo é apenas validar se sua URL está recebendo corretamente o callback enviado pelo sistema.
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowTestAlert(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleConfirmarTeste}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Enviar Teste
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Histórico de Edições */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Histórico de Edições</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Data e hora</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Autenticação</TableHead>
                  <TableHead>Chave</TableHead>
                  <TableHead>Status selecionado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historico.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.usuario}</TableCell>
                    <TableCell>{item.dataHora}</TableCell>
                    <TableCell className="max-w-xs truncate font-mono text-xs">{item.url}</TableCell>
                    <TableCell>{item.metodo}</TableCell>
                    <TableCell>{item.autenticacao}</TableCell>
                    <TableCell className="max-w-xs truncate font-mono text-xs">{item.chave}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
