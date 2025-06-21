
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropostaData {
  numero: string;
  cliente: string;
  cpf: string;
  dataEnvio: string;
  valorSolicitado: string;
  situacao: string;
  parceiro: string;
  status: string;
}

interface PropostaSummaryCardProps {
  propostaData: PropostaData;
}

export function PropostaSummaryCard({ propostaData }: PropostaSummaryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'em análise':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'aprovada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejeitada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-blue-900 text-lg font-semibold">
          Dados da Proposta
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">NÚMERO</label>
              <p className="text-blue-900 font-semibold text-lg">#{propostaData.numero}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">DATA DE ENVIO</label>
              <p className="text-blue-900 font-medium">{propostaData.dataEnvio}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">CLIENTE</label>
              <p className="text-blue-900 font-semibold">{propostaData.cliente}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">VALOR SOLICITADO</label>
              <p className="text-blue-900 font-semibold text-lg">{propostaData.valorSolicitado}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">CPF</label>
              <p className="text-blue-900 font-semibold">{propostaData.cpf}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">SITUAÇÃO</label>
              <Badge className={`${getStatusColor(propostaData.situacao)} font-medium px-3 py-1`}>
                {propostaData.situacao}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">PARCEIRO</label>
              <p className="text-blue-900 font-medium">{propostaData.parceiro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-blue-700 uppercase tracking-wide">STATUS</label>
              <p className="text-blue-900 font-medium">{propostaData.status}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
