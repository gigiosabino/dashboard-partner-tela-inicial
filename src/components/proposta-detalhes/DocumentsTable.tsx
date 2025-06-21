
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
                onClick={() => onDownload(doc.nome)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-medium px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
                size="sm"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
