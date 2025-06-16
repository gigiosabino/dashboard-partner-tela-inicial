
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function ReenvioCallbacksContent() {
  const [propostas, setPropostas] = useState("");
  const [status, setStatus] = useState("");

  const handleEnviar = () => {
    console.log("Reenviando callbacks:", { propostas, status });
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-4xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Aprovada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aprovada">Aprovada</SelectItem>
                  <SelectItem value="Em Análise">Em Análise</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                  <SelectItem value="Liberada">Liberada</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Propostas *
              </label>
              <Textarea
                placeholder="12345678&#10;87654321"
                value={propostas}
                onChange={(e) => setPropostas(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleEnviar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
