import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

// Gerar dados mock para 30 propostas
const generateMockPropostas = () => {
  const nomes = [
    "Nome do cliente",
    "Nome do cliente", 
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente",
    "Nome do cliente"
  ];
  
  const cpfs = [
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10", 
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10",
    "123.456.789-10"
  ];

  const valores = [
    "R$ 20.000,00",
    "R$ 1.000,00",
    "R$ 2.946.000,00",
    "R$ 15.500,00",
    "R$ 8.750,00",
    "R$ 45.200,00",
    "R$ 12.300,00",
    "R$ 67.800,00",
    "R$ 23.450,00",
    "R$ 34.600,00"
  ];

  const propostas = [];
  for (let i = 1; i <= 30; i++) {
    propostas.push({
      id: `05693${9510 + i}`,
      cliente: nomes[i % nomes.length],
      cpf: cpfs[i % cpfs.length],
      valor: valores[i % valores.length],
      status: i % 2 === 0 ? "Aprovada" : "Em Análise",
      tempo: `${Math.floor(Math.random() * 12) + 1} horas atrás`
    });
  }
  return propostas;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Em Análise":
      return "secondary";
    case "Aprovada":
      return "outline";
    default:
      return "secondary";
  }
};

export function RecentPendencies() {
  const [propostas, setPropostas] = useState(generateMockPropostas());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Atualizando propostas recentes...");
    
    // Simula um delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Gera novas propostas
    setPropostas(generateMockPropostas());
    setIsRefreshing(false);
    
    console.log("Propostas recentes atualizadas!");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Propostas Recentes</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Propostas com status "Aprovada" ou "Em análise" - Total: {propostas.length}
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {propostas.map((proposta) => (
            <div key={proposta.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">#{proposta.id}</span>
                  <Badge variant={getStatusVariant(proposta.status)} className="text-xs">
                    {proposta.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-900">{proposta.cliente}</p>
                <p className="text-xs text-gray-500">{proposta.cpf}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-green-600">{proposta.valor}</span>
                  <span className="text-xs text-gray-400">{proposta.tempo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
