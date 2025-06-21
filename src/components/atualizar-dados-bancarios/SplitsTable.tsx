
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateBankDataModal } from "./UpdateBankDataModal";

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

interface SplitsTableProps {
  splits: Split[];
  onSaveSplit: (splitId: string) => void;
}

export function SplitsTable({ splits, onSaveSplit }: SplitsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 border-b border-slate-200">
            <TableHead className="text-slate-700 font-semibold">ID</TableHead>
            <TableHead className="text-slate-700 font-semibold">Previsão de Pagamento</TableHead>
            <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
            <TableHead className="text-slate-700 font-semibold">Valor</TableHead>
            <TableHead className="text-slate-700 font-semibold">Banco</TableHead>
            <TableHead className="text-slate-700 font-semibold">Agência</TableHead>
            <TableHead className="text-slate-700 font-semibold">Conta</TableHead>
            <TableHead className="text-slate-700 font-semibold">Favorecido</TableHead>
            <TableHead className="text-slate-700 font-semibold">Código de Barras</TableHead>
            <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splits.map((split, index) => (
            <TableRow 
              key={split.id} 
              className={`hover:bg-slate-50 ${
                index === 0 ? 'border-t border-slate-200' : ''
              } ${
                index === splits.length - 1 ? 'border-b border-slate-200' : 'border-b border-slate-100'
              }`}
            >
              <TableCell className="font-medium text-blue-700">{split.id}</TableCell>
              <TableCell className="text-slate-700">{split.previsaoPagamento || "-"}</TableCell>
              <TableCell>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                  split.situacao === "Pago" ? "bg-green-50 text-green-700 border-green-200" :
                  split.situacao === "Liberado" ? "bg-blue-50 text-blue-700 border-blue-200" :
                  "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}>
                  {split.situacao}
                </span>
              </TableCell>
              <TableCell className="font-medium text-slate-900">{split.valor}</TableCell>
              <TableCell className="text-slate-700">{split.banco || "-"}</TableCell>
              <TableCell className="text-slate-700">{split.agencia || "-"}</TableCell>
              <TableCell className="text-slate-700">{split.conta || "-"}</TableCell>
              <TableCell className="text-slate-700">{split.favorecido}</TableCell>
              <TableCell>
                {split.codBarras ? (
                  <span className="text-xs font-mono text-slate-600" title={split.codBarras}>
                    {split.codBarras.substring(0, 15)}...
                  </span>
                ) : (
                  <span className="text-slate-500">-</span>
                )}
              </TableCell>
              <TableCell>
                <UpdateBankDataModal 
                  title={`Atualizar Dados Bancários - Split ${split.id}`}
                  onSave={() => onSaveSplit(split.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
