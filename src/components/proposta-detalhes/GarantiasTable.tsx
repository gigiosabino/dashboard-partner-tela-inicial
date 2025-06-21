
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
import { GarantiaModal } from "./GarantiaModal";
import { useState } from "react";

interface Garantia {
  id: string;
  grupo: string;
  subgrupo: string;
  valor: string;
  codigoGarantia?: string;
  codigoIdentificador?: string;
  valorTotal?: string;
  indicaProcessoConstituicao?: boolean;
  descricao?: string;
  // Campos específicos para cada tipo
  [key: string]: any;
}

interface GarantiasTableProps {
  garantias: Garantia[];
}

export function GarantiasTable({ garantias }: GarantiasTableProps) {
  const [selectedGarantia, setSelectedGarantia] = useState<Garantia | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVisualizarGarantia = (garantia: Garantia) => {
    setSelectedGarantia(garantia);
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-200">
              <TableHead className="text-slate-700 font-semibold">Grupo</TableHead>
              <TableHead className="text-slate-700 font-semibold">Subgrupo</TableHead>
              <TableHead className="text-slate-700 font-semibold">Valor</TableHead>
              <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
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
                <TableCell className="font-medium text-blue-700">{garantia.grupo}</TableCell>
                <TableCell className="text-slate-700">{garantia.subgrupo}</TableCell>
                <TableCell className="font-medium text-slate-900">{garantia.valor}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVisualizarGarantia(garantia)}
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

      <GarantiaModal
        garantia={selectedGarantia}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
