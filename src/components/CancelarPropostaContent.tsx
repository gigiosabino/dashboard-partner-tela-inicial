
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, X } from "lucide-react";
import { useState } from "react";

export function CancelarPropostaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const [propostaEncontrada, setPropostaEncontrada] = useState<any>(null);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleBuscarProposta = async () => {
    if (!numeroProposta.trim()) {
      return;
    }

    setIsSearching(true);
    console.log("Buscando proposta:", numeroProposta);
    
    // Simular busca da proposta
    setTimeout(() => {
      // Simular proposta encontrada ou não encontrada
      if (numeroProposta === "004935629") {
        setPropostaEncontrada({
          numero: "004935629",
          cliente: "TESTE LUCCA",
          cpf: "422.817.188-59",
          valor: "R$ 500,00",
          status: "Ativa"
        });
      } else {
        setPropostaEncontrada(null);
        alert("Proposta não encontrada!");
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

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Cancelar proposta</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Número da Proposta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número da proposta
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite o número da proposta"
                  value={numeroProposta}
                  onChange={(e) => setNumeroProposta(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleBuscarProposta}
                  disabled={!numeroProposta.trim() || isSearching}
                  variant="outline"
                  className="px-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Informações da Proposta Encontrada */}
            {propostaEncontrada && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Proposta Encontrada</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Número:</strong> #{propostaEncontrada.numero}</p>
                  <p><strong>Cliente:</strong> {propostaEncontrada.cliente}</p>
                  <p><strong>CPF:</strong> {propostaEncontrada.cpf}</p>
                  <p><strong>Valor:</strong> {propostaEncontrada.valor}</p>
                  <p><strong>Status:</strong> {propostaEncontrada.status}</p>
                </div>
              </div>
            )}

            {/* Motivo de Cancelamento */}
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
            </div>

            {/* Botão Cancelar */}
            <div className="flex justify-center">
              <Button
                onClick={handleCancelarProposta}
                disabled={!propostaEncontrada || !motivoCancelamento.trim()}
                className="bg-red-600 hover:bg-red-700 text-white px-8"
              >
                <X className="w-4 h-4 mr-2" />
                CANCELAR PROPOSTA
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
