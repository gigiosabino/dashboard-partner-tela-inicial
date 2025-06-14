
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Dados mockados da proposta
const propostaDetalhes = {
  numero: "004944577",
  data: "13/06/2025 15:28:20",
  status: "Aprovada",
  nomeCliente: "GIOVANNI SABINO 2",
  cpfCnpj: "419.854.578-22",
  valorSolicitado: "R$ 5.000,00",
  tc: "R$ 100,00",
  limiteAprovado: "R$ 99.999.999.999,99",
  iof: "R$ 15,00",
  parceiro: "GIOVANNI LTDA",
  valorFinanciado: "R$ 5.115,00",
  taxaAm: "3% / 42.58%",
  cetAm: "0% / 0%",
  parcelas: "2 / R$ 580,00",
  valorTotalDivida: "R$ 1.160,00"
};

const blocos = [
  "Campos Adicionais",
  "Assinantes (CCB Digital)",
  "Complemento Loja",
  "Observações do analista",
  "Itens da Análise",
  "Boletos da Proposta",
  "Custos e Serviços Complementares",
  "Avalistas",
  "Veículos",
  "Dados do Cliente",
  "Endereço",
  "Profissional",
  "Contatos",
  "Referências",
  "Referências Bancárias",
  "Conta de Pagamento da Proposta",
  "Outros Pagamentos da Proposta",
  "Documentos do Cliente",
  "Documentos da Proposta"
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "bg-green-100 text-green-800";
    case "Em Análise":
      return "bg-yellow-100 text-yellow-800";
    case "Rejeitada":
      return "bg-red-100 text-red-800";
    case "Pendente":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function PropostaDetalhesContent() {
  const { numero } = useParams();
  const navigate = useNavigate();
  const [blocosAbertos, setBlocosAbertos] = useState<Record<string, boolean>>({});

  const toggleBloco = (bloco: string) => {
    setBlocosAbertos(prev => ({
      ...prev,
      [bloco]: !prev[bloco]
    }));
  };

  const handleVoltar = () => {
    navigate('/propostas');
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div className="text-sm text-gray-600">
              <span>Propostas</span> > <span>Analisar Proposta</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              COMENTÁRIOS
            </Button>
            <Badge className={getStatusColor(propostaDetalhes.status)}>
              {propostaDetalhes.status}
            </Badge>
            <Badge variant="outline">Normal</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" onClick={handleVoltar}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Número da proposta: {propostaDetalhes.numero}
            </h1>
            <p className="text-sm text-gray-600">{propostaDetalhes.data}</p>
          </div>
        </div>

        {/* Informações principais da proposta */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nome/Razão Social</label>
                <p className="text-sm">{propostaDetalhes.nomeCliente}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor solicitado</label>
                <p className="text-sm">{propostaDetalhes.valorSolicitado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Taxa a.m. / a.a.</label>
                <p className="text-sm">{propostaDetalhes.taxaAm}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">CPF/CNPJ</label>
                <p className="text-sm">{propostaDetalhes.cpfCnpj}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">TC</label>
                <p className="text-sm">{propostaDetalhes.tc}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">CET a.m./a.a.</label>
                <p className="text-sm">{propostaDetalhes.cetAm}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Limite aprovado</label>
                <p className="text-sm">{propostaDetalhes.limiteAprovado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">IOF</label>
                <p className="text-sm">{propostaDetalhes.iof}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Parcelas / Valor parcela</label>
                <p className="text-sm">{propostaDetalhes.parcelas}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Parceiro</label>
                <p className="text-sm">{propostaDetalhes.parceiro}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor financiado</label>
                <p className="text-sm">{propostaDetalhes.valorFinanciado}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Valor total da dívida</label>
                <p className="text-sm">{propostaDetalhes.valorTotalDivida}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blocos colapsáveis */}
        <div className="space-y-4">
          {blocos.map((bloco) => (
            <div key={bloco} className="bg-white rounded-lg shadow overflow-hidden">
              <Collapsible>
                <CollapsibleTrigger
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleBloco(bloco)}
                >
                  <span className="font-medium text-gray-900">{bloco}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 cursor-pointer">Atualizar</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        blocosAbertos[bloco] ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      Conteúdo de {bloco} será exibido aqui quando implementado.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-4 mt-auto">
        <p className="text-sm text-gray-500">© 2025</p>
      </footer>
    </div>
  );
}
