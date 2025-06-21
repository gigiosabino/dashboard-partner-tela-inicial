
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

interface Document {
  tipo: string;
  nome: string;
  dataInclusao: string;
  validoAte: string;
}

interface DocumentsTableProps {
  documents: Document[];
  onDownload: (documentName: string) => void;
}

export function DocumentsTable({ documents, onDownload }: DocumentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo do Documento</TableHead>
          <TableHead>Nome do Documento</TableHead>
          <TableHead>Data de Inclusão</TableHead>
          <TableHead>Válido até</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{doc.tipo}</TableCell>
            <TableCell>{doc.nome}</TableCell>
            <TableCell>{doc.dataInclusao}</TableCell>
            <TableCell>{doc.validoAte}</TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDownload(doc.nome)}
                className="border-slate-300 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
