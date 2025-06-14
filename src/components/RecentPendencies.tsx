
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from "lucide-react";

interface Pendency {
  id: string;
  proposalNumber: string;
  clientName: string;
  daysAgo: number;
}

interface RecentPendenciesProps {
  selectedPeriod: string;
}

export function RecentPendencies({ selectedPeriod }: RecentPendenciesProps) {
  // Mock data - em um cenário real, viria da API baseado no período selecionado
  const pendencies: Pendency[] = [
    {
      id: "1",
      proposalNumber: "#004935629",
      clientName: "TESTE LUCCA",
      daysAgo: 2
    },
    {
      id: "2",
      proposalNumber: "#004935630",
      clientName: "JOÃO SILVA SANTOS",
      daysAgo: 1
    },
    {
      id: "3",
      proposalNumber: "#004935631",
      clientName: "MARIA OLIVEIRA LTDA",
      daysAgo: 5
    }
  ];

  const handleNavigateToGuarantees = () => {
    // Aqui será implementada a navegação para "Formalização de garantias"
    console.log("Navegando para Formalização de garantias");
    // Exemplo: navigate('/formalizacao-garantias');
  };

  const getDaysColor = (days: number) => {
    if (days <= 1) return "text-orange-600 bg-orange-50 border-orange-200";
    if (days <= 3) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <CardTitle className="text-lg font-semibold text-gray-900">
            Pendências Recentes
          </CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNavigateToGuarantees}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Propostas que necessitam de atenção
        </p>
        
        <div className="space-y-3">
          {pendencies.map((pendency) => (
            <div
              key={pendency.id}
              className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${getDaysColor(pendency.daysAgo)}`}
              onClick={handleNavigateToGuarantees}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Proposta {pendency.proposalNumber}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {pendency.clientName}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    {pendency.daysAgo} {pendency.daysAgo === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {pendencies.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma pendência no período selecionado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
