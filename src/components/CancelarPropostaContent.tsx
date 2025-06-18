
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";

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
          status: "Ativa",
          dataEnvio: "05/06/2025",
          valorSolicitado: "R$ 500,00",
          parceiro: "Parceiro Exemplo",
          situacao: "Em análise"
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
      <GlobalHeader title="Cancelar proposta" />

      {/* Main Content */}
      <main className="p-6">
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
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
      </main>
    </div>
  );
}
