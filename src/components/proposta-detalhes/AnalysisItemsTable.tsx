
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AnalysisItem {
  resolvido: boolean;
  descricao: string;
  conferido: boolean;
  status: string;
  alerta: string;
  automacao: string;
}

interface AnalysisItemsTableProps {
  items: AnalysisItem[];
}

export function AnalysisItemsTable({ items }: AnalysisItemsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Resolvido?</TableHead>
          <TableHead>Descrição Script</TableHead>
          <TableHead>Conferido?</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Alerta</TableHead>
          <TableHead>Automação</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Badge variant={item.resolvido ? "default" : "destructive"}>
                {item.resolvido ? "Sim" : "Não"}
              </Badge>
            </TableCell>
            <TableCell>{item.descricao}</TableCell>
            <TableCell>
              <Badge variant={item.conferido ? "default" : "secondary"}>
                {item.conferido ? "Sim" : "Não"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>{item.alerta}</TableCell>
            <TableCell>{item.automacao}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" className="border-slate-300 hover:bg-slate-50">
                Editar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
