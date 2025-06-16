
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
import { useState } from "react";
import { History } from "lucide-react";

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
  const [urlFinal, setUrlFinal] = useState("https://webhook.site:443/b33b59bf-1ca6-4fcd-ad19-fca898847585?proposta={PROPOSTA}&situacao={SITUACAO}&identificador={IDENTIFICADOR}");
  const [eventosSelecionados, setEventosSelecionados] = useState(eventos);

  const handleEventoChange = (index: number, checked: boolean) => {
    const novosEventos = [...eventosSelecionados];
    novosEventos[index].selecionado = checked;
    setEventosSelecionados(novosEventos);
  };

  const totalSelecionados = eventosSelecionados.filter(evento => evento.selecionado).length;

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
        {/* Configuração */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Resumo da Configuração</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo:</label>
              <p className="text-sm">Propostas</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Integração:</label>
              <p className="text-sm">TESTE G</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Método:</label>
              <p className="text-sm">POST</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eventos:</label>
              <p className="text-sm">{totalSelecionados} selecionados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL final:</label>
              <Input
                value={urlFinal}
                onChange={(e) => setUrlFinal(e.target.value)}
                className="w-full"
                readOnly
              />
            </div>

            <div className="flex justify-between items-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Salvar Configuração
              </Button>
              <Button variant="outline" className="border-gray-300">
                Testar Webhook
              </Button>
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
                  <span className="ml-2 text-xs text-gray-500">{evento.quantidade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Edições */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Histórico de Edições</h2>
          </div>

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
                  <TableCell className="max-w-xs truncate">{item.url}</TableCell>
                  <TableCell>{item.metodo}</TableCell>
                  <TableCell>{item.autenticacao}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.chave}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
