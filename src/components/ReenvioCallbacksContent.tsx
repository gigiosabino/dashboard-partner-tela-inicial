
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

export function ReenvioCallbacksContent() {
  const [numeroPropostas, setNumeroPropostas] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("");

  const handleEnviar = () => {
    console.log("Reenviando callbacks...", {
      propostas: numeroPropostas.split('\n').filter(n => n.trim()),
      status: statusSelecionado
    });
  };

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
                Status para Reenvio
              </label>
              <Select value={statusSelecionado} onValueChange={setStatusSelecionado}>
                <SelectTrigger className="w-full border-slate-300 focus:border-blue-600 focus:ring-blue-600">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white shadow-lg">
                  <SelectItem value="aprovada" className="text-slate-700 hover:bg-slate-50">Aprovada</SelectItem>
                  <SelectItem value="finalizada" className="text-slate-700 hover:bg-slate-50">Finalizada</SelectItem>
                  <SelectItem value="liberada" className="text-slate-700 hover:bg-slate-50">Liberada</SelectItem>
                  <SelectItem value="paga" className="text-slate-700 hover:bg-slate-50">Paga</SelectItem>
                  <SelectItem value="cedida" className="text-slate-700 hover:bg-slate-50">Cedida</SelectItem>
                  <SelectItem value="cancelada" className="text-slate-700 hover:bg-slate-50">Cancelada</SelectItem>
                  <SelectItem value="recusada" className="text-slate-700 hover:bg-slate-50">Recusada</SelectItem>
                  <SelectItem value="em-analise" className="text-slate-700 hover:bg-slate-50">Em Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleEnviar}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                disabled={!numeroPropostas.trim() || !statusSelecionado}
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
