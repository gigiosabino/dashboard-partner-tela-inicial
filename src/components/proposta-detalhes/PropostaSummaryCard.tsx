
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface PropostaData {
  numero: string;
  cliente: string;
  cpf: string;
  dataEnvio: string;
  valorSolicitado: string;
  situacao: string;
  parceiro: string;
  status: string;
  limiteAprovado?: string;
  tc?: string;
  iof?: string;
  cetAnualAm?: string;
  parcelasValorParcela?: string;
  valorFinanciado?: string;
  valorTotalDivida?: string;
  taxaAm?: string;
}

interface PropostaSummaryCardProps {
  propostaData: PropostaData;
  onComentariosClick?: () => void;
}

export function PropostaSummaryCard({ propostaData, onComentariosClick }: PropostaSummaryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'liberada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aprovada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'em análise':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejeitada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {propostaData.dataEnvio}
            </div>
            <div className="text-lg font-bold text-gray-900">
              Número da proposta: {propostaData.numero}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onComentariosClick}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-medium px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              size="sm"
            >
              <MessageSquare className="w-4 h-4" />
              COMENTÁRIOS
            </Button>
            <Badge className={`${getStatusColor('liberada')} font-medium px-3 py-1`}>
              Liberada
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Nome/Razão Social</label>
              <p className="text-gray-900 font-medium">{propostaData.cliente}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Valor solicitado</label>
              <p className="text-gray-900 font-medium">{propostaData.valorSolicitado}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Taxa a.m. / a.a.</label>
              <p className="text-gray-900 font-medium">{propostaData.taxaAm || '13.48999% / 356.55%'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">CPF/CNPJ</label>
              <p className="text-gray-900 font-medium">{propostaData.cpf}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">TC</label>
              <p className="text-gray-900 font-medium">{propostaData.tc || 'R$ 0,00'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">CET a.m./a.a.</label>
              <p className="text-gray-900 font-medium">{propostaData.cetAnualAm || '13.87415% / 375.4464%'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Limite aprovado</label>
              <p className="text-gray-900 font-medium">{propostaData.limiteAprovado || 'R$ 0,00'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">IOF</label>
              <p className="text-gray-900 font-medium">{propostaData.iof || 'R$ 0,21'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Parcelas / Valor parcela</label>
              <p className="text-gray-900 font-medium">{propostaData.parcelasValorParcela || '4 / R$ 7,46'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Parceiro</label>
              <p className="text-gray-900 font-medium">{propostaData.parceiro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Valor financiado</label>
              <p className="text-gray-900 font-medium">{propostaData.valorFinanciado || 'R$ 21,99'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Valor total da dívida</label>
              <p className="text-gray-900 font-medium">{propostaData.valorTotalDivida || 'R$ 29,84'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
