
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentPropostas = [
  {
    id: "056939510",
    cliente: "IZABELA MARIA PEREIRA DE AZEVEDO",
    cpf: "077.445.417-23",
    valor: "R$ 20.000,00",
    status: "Cedida",
    tempo: "2 horas atrás"
  },
  {
    id: "056441261", 
    cliente: "BMP MONEY PLUS",
    cpf: "123.983.910-35",
    valor: "R$ 1.000,00",
    status: "Em Análise",
    tempo: "4 horas atrás"
  },
  {
    id: "056411663",
    cliente: "BETANIA MARIA SILVA DE LIRA", 
    cpf: "066.742.374-50",
    valor: "R$ 2.946.000,00",
    status: "Cancelada",
    tempo: "6 horas atrás"
  },
  {
    id: "056386138",
    cliente: "BMP MONEY PLUS",
    cpf: "123.983.910-35", 
    valor: "R$ 117.500,00",
    status: "Aprovada",
    tempo: "8 horas atrás"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Cedida":
      return "default";
    case "Em Análise":
      return "secondary";
    case "Cancelada":
      return "destructive";
    case "Aprovada":
      return "outline";
    default:
      return "secondary";
  }
};

export function RecentPendencies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Propostas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPropostas.map((proposta) => (
          <div key={proposta.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
      </CardContent>
    </Card>
  );
}
