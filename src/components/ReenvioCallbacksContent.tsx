
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

const statusPorTipo = {
  proposta: [
    "Em análise",
    "Aprovada", 
    "Recusada",
    "Cancelada",
    "Pendente",
    "Finalizada",
    "Conferida",
    "Liberada",
    "Paga",
    "Cedida",
    "Pendente pagamento"
  ],
  fgts: [
    "Cancelamento Efetivado",
    "Boleto registrado",
    "Pagamento parcial",
    "Pagamento não realizado",
    "Cancelamento não efetivado"
  ],
  "agenda-recebiveis": [
    "Criação da agenda",
    "Cancelamento da agenda",
    "Acréscimo/ Abatimento",
    "Lançamento na parcela",
    "Prorrogamento do vencimento",
    "Geração de boleto",
    "Cancelamento de boleto",
    "Registro de cobrança"
  ],
  "proposta-lancamento-split": [
    "Em análise",
    "Aprovada",
    "Recusada",
    "Cancelada",
    "Pendente",
    "Finalizada",
    "Conferida",
    "Liberada",
    "Paga",
    "Cedida",
    "Pendente pagamento"
  ]
};

export function ReenvioCallbacksContent() {
  const [numeroPropostas, setNumeroPropostas] = useState("");
  const [tipoCallback, setTipoCallback] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("");

  const handleTipoCallbackChange = (novoTipo: string) => {
    setTipoCallback(novoTipo);
    setStatusSelecionado(""); // Limpar status quando mudar o tipo
  };

  const handleEnviar = () => {
    console.log("Reenviando callbacks...", {
      propostas: numeroPropostas.split('\n').filter(n => n.trim()),
      tipoCallback: tipoCallback,
      status: statusSelecionado
    });
  };

  const statusDisponiveis = tipoCallback ? statusPorTipo[tipoCallback as keyof typeof statusPorTipo] || [] : [];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title="Reenvio de Callbacks" 
        subtitle="Reenvie callbacks para propostas específicas" 
      />

      <main className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-6 text-slate-900">Reenviar Callbacks</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Números das Propostas
              </label>
              <Textarea
                placeholder="Digite os números das propostas, um por linha"
                className="w-full h-32 resize-none border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                value={numeroPropostas}
                onChange={(e) => setNumeroPropostas(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                Digite um número de proposta por linha
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Callback
              </label>
              <Select value={tipoCallback} onValueChange={handleTipoCallbackChange}>
                <SelectTrigger className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600">
                  <SelectValue placeholder="Selecione o tipo de callback" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white shadow-lg">
                  <SelectItem value="proposta" className="text-slate-700 hover:bg-slate-50">Proposta</SelectItem>
                  <SelectItem value="fgts" className="text-slate-700 hover:bg-slate-50">FGTS</SelectItem>
                  <SelectItem value="agenda-recebiveis" className="text-slate-700 hover:bg-slate-50">Agenda recebíveis</SelectItem>
                  <SelectItem value="proposta-lancamento-split" className="text-slate-700 hover:bg-slate-50">Proposta Lançamento (split)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {tipoCallback && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status para Reenvio
                </label>
                <Select value={statusSelecionado} onValueChange={setStatusSelecionado}>
                  <SelectTrigger className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 bg-white shadow-lg">
                    {statusDisponiveis.map((status) => (
                      <SelectItem key={status} value={status} className="text-slate-700 hover:bg-slate-50">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={handleEnviar}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                disabled={!numeroPropostas.trim() || !tipoCallback || !statusSelecionado}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
