
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
import { VeiculoModal } from "./VeiculoModal";
import { useState } from "react";

interface Veiculo {
  id: string;
  placa: string;
  chassi: string;
  anoFab: string;
  anoMod: string;
  descricao: string;
  proprietario: string;
  cpfCnpj: string;
  marca: string;
  modelo: string;
  versao: string;
  valorFipe: string;
  valorVeiculo: string;
  zeroKm: boolean;
  km: string;
  cor: string;
  tipoChissi: string;
  tipoRestricao: string;
  renavam: string;
  ufLicenciamento: string;
  numeroGravame: string;
  financiado: boolean;
  saldo: string;
  tipoPlaca: string;
  tipoVeiculo: string;
  pendenciaGravame: string;
  identificador: string;
  houveConsultaRenave: boolean;
}

interface VeiculosTableProps {
  veiculos: Veiculo[];
}

export function VeiculosTable({ veiculos }: VeiculosTableProps) {
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVisualizarVeiculo = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-200">
              <TableHead className="text-slate-700 font-semibold">Placa</TableHead>
              <TableHead className="text-slate-700 font-semibold">Chassi</TableHead>
              <TableHead className="text-slate-700 font-semibold">Ano Fab/Ano Mod.</TableHead>
              <TableHead className="text-slate-700 font-semibold">Descrição</TableHead>
              <TableHead className="text-slate-700 font-semibold">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {veiculos.map((veiculo, index) => (
              <TableRow 
                key={veiculo.id} 
                className={`hover:bg-slate-50 ${
                  index === 0 ? 'border-t border-slate-200' : ''
                } ${
                  index === veiculos.length - 1 ? 'border-b border-slate-200' : 'border-b border-slate-100'
                }`}
              >
                <TableCell className="font-medium text-blue-700">{veiculo.placa}</TableCell>
                <TableCell className="text-slate-700">{veiculo.chassi}</TableCell>
                <TableCell className="text-slate-700">{veiculo.anoFab}/{veiculo.anoMod}</TableCell>
                <TableCell className="text-slate-700">{veiculo.descricao}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleVisualizarVeiculo(veiculo)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-medium px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
                    size="sm"
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

      <VeiculoModal
        veiculo={selectedVeiculo}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
