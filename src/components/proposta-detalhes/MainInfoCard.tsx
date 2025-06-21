
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MainInfoCardProps {
  propostaData: {
    numero: string;
    tarifaCadastro: string;
    iof: string;
    valorDivida: string;
    campoAuxiliar1: string;
    campoAuxiliar3: string;
    tipoOperacao: string;
    modelo: string;
    taxaMensal: string;
    taxaAnual: string;
    fluxo: string;
    valorSolicitado: string;
    vendedor: string;
    numParcelas: string;
    primeiroVencimento: string;
    parceiro: string;
    valorAprovado: string;
    cetAnual: string;
    tipoContrato: string;
    valorParcela: string;
    valorTotalCredito: string;
    campoAuxiliar2: string;
    campoAuxiliar4: string;
  };
}

export function MainInfoCard({ propostaData }: MainInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardTitle className="text-slate-900">Informações Principais</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Número da Proposta</label>
              <p className="text-slate-900 font-medium">#{propostaData.numero}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Tarifa Cadastro / IOF</label>
              <p className="text-slate-900">{propostaData.tarifaCadastro} / {propostaData.iof}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Valor da Dívida</label>
              <p className="text-slate-900 font-semibold">{propostaData.valorDivida}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Campo Auxiliar 1</label>
              <p className="text-slate-900">{propostaData.campoAuxiliar1}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Campo Auxiliar 3</label>
              <p className="text-slate-900">{propostaData.campoAuxiliar3}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Tipo de Operação / Modelo</label>
              <p className="text-slate-900">{propostaData.tipoOperacao} / {propostaData.modelo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Taxa a.m. / a.a.</label>
              <p className="text-slate-900">{propostaData.taxaMensal} / {propostaData.taxaAnual}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Fluxo</label>
              <p className="text-slate-900">{propostaData.fluxo}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Solicitado</label>
              <p className="text-slate-900 font-semibold">{propostaData.valorSolicitado}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Vendedor</label>
              <p className="text-slate-900">{propostaData.vendedor}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Parcelas / Valor Solicitado</label>
              <p className="text-slate-900">{propostaData.numParcelas}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">1º Vencimento</label>
              <p className="text-slate-900">{propostaData.primeiroVencimento}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Parceiro/Correspondente</label>
              <p className="text-slate-900">{propostaData.parceiro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Aprovado</label>
              <p className="text-slate-900 font-semibold">{propostaData.valorAprovado}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">CET Anual</label>
              <p className="text-slate-900">{propostaData.cetAnual}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Tipo de Contrato</label>
              <p className="text-slate-900">{propostaData.tipoContrato}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Parcelas / Valor Aprovado</label>
              <p className="text-slate-900">{propostaData.numParcelas} {propostaData.valorParcela}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Total do Crédito</label>
              <p className="text-slate-900 font-semibold">{propostaData.valorTotalCredito}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Campo Auxiliar 2</label>
              <p className="text-slate-900">{propostaData.campoAuxiliar2}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Campo Auxiliar 4</label>
              <p className="text-slate-900">{propostaData.campoAuxiliar4}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
