
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateBankDataModal } from "./UpdateBankDataModal";
import { SplitsTable } from "./SplitsTable";

interface Split {
  id: string;
  previsaoPagamento: string | null;
  situacao: string;
  valor: string;
  banco: string | null;
  agencia: string | null;
  conta: string | null;
  favorecido: string;
  codBarras: string | null;
  tipo: string;
}

interface Proposta {
  numeroCCB: string;
  status: string;
  dataTentativaPagamento: string;
  nomeCliente: string;
  documentoCliente: string;
  nomeBeneficiario: string;
  documentoBeneficiario: string;
  valorPagar: string;
  temSplit: boolean;
  splits?: Split[];
}

interface PropostasTableProps {
  propostas: Proposta[];
  onSave: () => void;
  onSaveSplit: (splitId: string) => void;
}

export function PropostasTable({ propostas, onSave, onSaveSplit }: PropostasTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (numero: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(numero)) {
      newExpanded.delete(numero);
    } else {
      newExpanded.add(numero);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <TableHead className="w-12 text-slate-700 font-semibold"></TableHead>
            <TableHead className="text-slate-700 font-semibold">Número CCB</TableHead>
            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
            <TableHead className="text-slate-700 font-semibold">Data Tentativa Pagamento</TableHead>
            <TableHead className="text-slate-700 font-semibold">Nome Cliente</TableHead>
            <TableHead className="text-slate-600 font-semibold">Documento Federal Cliente</TableHead>
            <TableHead className="text-slate-700 font-semibold">Nome Beneficiário</TableHead>
            <TableHead className="text-slate-600 font-semibold">Documento Federal Beneficiário</TableHead>
            <TableHead className="text-slate-700 font-semibold">Valor a ser Pago</TableHead>
            <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propostas.map((proposta) => (
            <>
              <TableRow key={proposta.numeroCCB} className="hover:bg-slate-50 border-b border-slate-100">
                <TableCell>
                  {proposta.temSplit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(proposta.numeroCCB)}
                      className="p-1 text-slate-600 hover:bg-slate-100"
                    >
                      {expandedRows.has(proposta.numeroCCB) ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </TableCell>
                <TableCell className="font-medium text-blue-700">#{proposta.numeroCCB}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    proposta.status === "Pendente pagamento" 
                      ? "bg-red-50 text-red-700 border border-red-200" 
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {proposta.status}
                  </span>
                </TableCell>
                <TableCell className="text-slate-700">{proposta.dataTentativaPagamento}</TableCell>
                <TableCell className="text-slate-700">{proposta.nomeCliente}</TableCell>
                <TableCell className="text-slate-600">{proposta.documentoCliente}</TableCell>
                <TableCell className="text-slate-700">{proposta.nomeBeneficiario}</TableCell>
                <TableCell className="text-slate-600">{proposta.documentoBeneficiario}</TableCell>
                <TableCell className="font-medium text-slate-900">{proposta.valorPagar}</TableCell>
                <TableCell>
                  <UpdateBankDataModal 
                    title={`Atualizar Dados Bancários - #${proposta.numeroCCB}`}
                    onSave={onSave}
                  />
                </TableCell>
              </TableRow>

              {/* Splits expandidos */}
              {expandedRows.has(proposta.numeroCCB) && proposta.splits && (
                <TableRow>
                  <TableCell colSpan={10} className="bg-slate-50 p-0">
                    <div className="p-4">
                      <h4 className="font-medium text-slate-900 mb-3">Splits da Proposta:</h4>
                      <SplitsTable splits={proposta.splits} onSaveSplit={onSaveSplit} />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
