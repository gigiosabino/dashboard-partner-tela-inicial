
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText, ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { GlobalHeader } from "@/components/GlobalHeader";
import { useNavigate, useParams } from "react-router-dom";

// Dados simulados para o contrato específico
const contratoDetalhes = {
  proposta: "0498051",
  cpfCnpj: "02883931470",
  nomeRazaoSocial: "CLIENTE TESTE",
  parceiro: "TESTE MICHEL",
  dataInclusao: "19/06/2025 05:23:39",
  situacao: "Aberta",
  valorFinanciado: "1,31",
  valorTotalDivida: "2,00",
  prazo: "1",
  valorTotalPago: "0,00"
};

// Dados das parcelas
const parcelas = [
  {
    parcela: "001",
    situacao: "Aberta",
    vencimentoOriginal: "01/04/2027",
    vencimentoAtual: "01/04/2027",
    valorOriginal: "2,00",
    saldoAtual: "1,36",
    ordemPagamento: ""
  }
];

export function ContratoDetalhesContent() {
  const navigate = useNavigate();
  const { numero } = useParams();

  const handleVoltar = () => {
    navigate("/visualizar-contratos");
  };

  const handleCancelarAgenda = () => {
    console.log("Cancelar agenda clicado");
  };

  const handleExportarExcel = () => {
    console.log("Exportando para Excel...");
  };

  const handleCobrancas = () => {
    console.log("Cobranças clicado");
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <GlobalHeader 
        title={`Agenda de Recebíveis - Contrato: ${numero}`} 
        subtitle="Detalhes do contrato e agenda de recebíveis"
      />

      <main className="p-6">
        {/* Botão Voltar */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={handleVoltar}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Detalhes do Contrato */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-600">Número da Proposta:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.proposta}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">CPF/CNPJ:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.cpfCnpj}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Nome/Razão Social:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.nomeRazaoSocial}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Parceiro:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.parceiro}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Data de Inclusão:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.dataInclusao}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Situação:</label>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                {contratoDetalhes.situacao}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Financiado:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorFinanciado}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Total Dívida:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorTotalDivida}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Prazo:</label>
              <p className="text-lg font-semibold text-slate-900">{contratoDetalhes.prazo}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600">Valor Total Pago:</label>
              <p className="text-lg font-semibold text-slate-900">R$ {contratoDetalhes.valorTotalPago}</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleCancelarAgenda}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancelar Agenda
            </Button>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-3 mb-6">
          <Button 
            onClick={handleExportarExcel}
            variant="outline" 
            className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar para Excel
          </Button>
          
          <Button 
            onClick={handleCobrancas}
            variant="outline" 
            className="border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Cobranças
          </Button>
        </div>

        {/* Tabela de Parcelas */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <TableHead className="text-slate-700 font-semibold">
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableHead>
                <TableHead className="text-slate-700 font-semibold">Parcela</TableHead>
                <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
                <TableHead className="text-slate-700 font-semibold">Vencimento Original</TableHead>
                <TableHead className="text-slate-700 font-semibold">Vencimento Atual</TableHead>
                <TableHead className="text-slate-700 font-semibold">Valor Original da Parcela R$</TableHead>
                <TableHead className="text-slate-700 font-semibold">Saldo Atual da Parcela R$</TableHead>
                <TableHead className="text-slate-700 font-semibold">Ordem Pagamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parcelas.map((parcela, index) => (
                <TableRow key={index} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell>
                    <input type="checkbox" className="rounded border-slate-300" />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.parcela}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {parcela.situacao}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">{parcela.vencimentoOriginal}</TableCell>
                  <TableCell className="text-slate-600">{parcela.vencimentoAtual}</TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.valorOriginal}</TableCell>
                  <TableCell className="font-medium text-slate-900">{parcela.saldoAtual}</TableCell>
                  <TableCell className="text-slate-600">{parcela.ordemPagamento || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Saldo Total */}
        <div className="flex justify-end mt-4">
          <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
            <span className="text-sm font-medium text-slate-700">Saldo Total: R$ 1,36</span>
          </div>
        </div>
      </main>
    </div>
  );
}
