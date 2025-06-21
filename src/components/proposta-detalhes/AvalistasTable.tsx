
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { AvalistaModal } from "./AvalistaModal";
import { useState } from "react";

interface Avalista {
  id: string;
  documentoFederal: string;
  nome: string;
  email?: string;
  telefone?: string;
  [key: string]: any;
}

interface AvalistasTableProps {
  avalistas: Avalista[];
}

export function AvalistasTable({ avalistas }: AvalistasTableProps) {
  const [selectedAvalista, setSelectedAvalista] = useState<Avalista | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVisualizarAvalista = (avalista: Avalista) => {
    setSelectedAvalista(avalista);
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-200">
              <TableHead className="text-slate-700 font-semibold">Documento Federal</TableHead>
              <TableHead className="text-slate-700 font-semibold">Nome</TableHead>
              <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {avalistas.map((avalista, index) => (
              <TableRow 
                key={avalista.id} 
                className={`hover:bg-slate-50 ${
                  index === 0 ? 'border-t border-slate-200' : ''
                } ${
                  index === avalistas.length - 1 ? 'border-b border-slate-200' : 'border-b border-slate-100'
                }`}
              >
                <TableCell className="font-medium text-blue-700">{avalista.documentoFederal}</TableCell>
                <TableCell className="text-slate-700">{avalista.nome}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVisualizarAvalista(avalista)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AvalistaModal
        avalista={selectedAvalista}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
