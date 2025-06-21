
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Garantia {
  id: string;
  tipo: string;
  descricao: string;
  valor: string;
  situacao: string;
}

interface GarantiasTableProps {
  garantias: Garantia[];
}

export function GarantiasTable({ garantias }: GarantiasTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 border-b border-slate-200">
            <TableHead className="text-slate-700 font-semibold">Tipo</TableHead>
            <TableHead className="text-slate-700 font-semibold">Descrição</TableHead>
            <TableHead className="text-slate-700 font-semibold">Valor</TableHead>
            <TableHead className="text-slate-700 font-semibold">Situação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {garantias.map((garantia, index) => (
            <TableRow 
              key={garantia.id} 
              className={`hover:bg-slate-50 ${
                index === 0 ? 'border-t border-slate-200' : ''
              } ${
                index === garantias.length - 1 ? 'border-b border-slate-200' : 'border-b border-slate-100'
              }`}
            >
              <TableCell className="font-medium text-blue-700">{garantia.tipo}</TableCell>
              <TableCell className="text-slate-700">{garantia.descricao}</TableCell>
              <TableCell className="font-medium text-slate-900">{garantia.valor}</TableCell>
              <TableCell>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                  garantia.situacao === "Ativa" ? "bg-green-50 text-green-700 border-green-200" :
                  garantia.situacao === "Pendente" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                  "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {garantia.situacao}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
