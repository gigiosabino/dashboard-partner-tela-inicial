
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comentario {
  data: string;
  responsavel: string;
  descricao: string;
  situacao: string;
  tipo: string;
}

interface ComentariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComentariosModal({ isOpen, onClose }: ComentariosModalProps) {
  const comentarios: Comentario[] = [
    {
      data: "21/06/2025 21:01:19",
      responsavel: "Iury Barbosa",
      descricao: "Proposta aprovada via WebService",
      situacao: "Aprovação Automática",
      tipo: "Situação"
    },
    {
      data: "21/06/2025 21:01:19",
      responsavel: "Iury Barbosa",
      descricao: "Situação de [Em Análise] para [Aprovada]",
      situacao: "Alteração da Situação",
      tipo: "Situação"
    },
    {
      data: "21/06/2025 21:01:21",
      responsavel: "Iury Barbosa",
      descricao: "Situação de [Aprovada] para [Finalizada]",
      situacao: "Alteração da Situação",
      tipo: "Situação"
    },
    {
      data: "21/06/2025 21:01:21",
      responsavel: "Iury Barbosa",
      descricao: "Proposta Finalizada via WebService",
      situacao: "Finalização Automática",
      tipo: "Situação"
    },
    {
      data: "21/06/2025 21:01:21",
      responsavel: "Iury Barbosa",
      descricao: "Proposta Liberada via WebService",
      situacao: "Liberação Automática",
      tipo: "Situação"
    },
    {
      data: "21/06/2025 21:01:21",
      responsavel: "Iury Barbosa",
      descricao: "Situação de [Finalizada] para [Liberada]",
      situacao: "Alteração da Situação",
      tipo: "Situação"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            Comentários
          </DialogTitle>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Data</TableHead>
                <TableHead className="w-32">Responsável</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-24">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comentarios.map((comentario, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">
                    {comentario.data}
                  </TableCell>
                  <TableCell className="text-sm">
                    {comentario.responsavel}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-blue-600 text-sm">
                          {comentario.situacao}
                        </div>
                        <div className="text-sm text-gray-700">
                          {comentario.descricao}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {comentario.tipo}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
            <span>Linhas por página: 10</span>
            <div className="flex items-center gap-2">
              <span>1-6 de 6</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0">
                  ‹
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0">
                  ›
                </Button>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="ml-auto">
              FECHAR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
