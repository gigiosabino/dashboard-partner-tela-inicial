
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Reenvio de Callbacks</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold mb-6">Reenviar Callbacks</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Números das Propostas
              </label>
              <Textarea
                placeholder="Digite os números das propostas, um por linha"
                className="w-full h-32 resize-none"
                value={numeroPropostas}
                onChange={(e) => setNumeroPropostas(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Digite um número de proposta por linha
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status para Reenvio
              </label>
              <Select value={statusSelecionado} onValueChange={setStatusSelecionado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aprovada">Aprovada</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                  <SelectItem value="liberada">Liberada</SelectItem>
                  <SelectItem value="paga">Paga</SelectItem>
                  <SelectItem value="cedida">Cedida</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                  <SelectItem value="recusada">Recusada</SelectItem>
                  <SelectItem value="em-analise">Em Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleEnviar}
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
