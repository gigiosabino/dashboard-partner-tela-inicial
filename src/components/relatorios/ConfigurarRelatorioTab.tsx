
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { NovoRelatorioModal } from "@/components/NovoRelatorioModal";

// Relatórios customizados existentes mockados
const relatoriosCustomizados = [
  {
    id: 1,
    nome: "Relatório Completo de Propostas",
    periodicidade: "Semanal",
    diaSemana: "1",
    camposSelecionados: ["DocumentoCliente", "VrSolicitado", "DataCriacao"],
    dataCriacao: "2024-01-15"
  },
  {
    id: 2,
    nome: "Relatório Financeiro",
    periodicidade: "Mensal",
    diaMes: "15",
    camposSelecionados: ["VrSolicitado", "VrParcela", "VrTAC", "VrIOF"],
    dataCriacao: "2024-02-01"
  },
  {
    id: 3,
    nome: "Relatório de Desembolsos",
    periodicidade: "Diário",
    camposSelecionados: ["CodigoBanco", "Agencia", "Conta", "DocumentoFederalPagamento"],
    dataCriacao: "2024-02-10"
  }
];

export function ConfigurarRelatorioTab() {
  const [modalAberto, setModalAberto] = useState(false);
  const [relatorioEditando, setRelatorioEditando] = useState<number | null>(null);

  const handleEditarRelatorio = (relatorio: any) => {
    setRelatorioEditando(relatorio.id);
    setModalAberto(true);
  };

  const handleNovoRelatorio = () => {
    setRelatorioEditando(null);
    setModalAberto(true);
  };

  const handleExcluirRelatorio = (id: number) => {
    toast.success("Relatório excluído com sucesso!");
  };

  const handleSalvarRelatorio = () => {
    const mensagem = relatorioEditando ? "Relatório atualizado com sucesso!" : "Relatório personalizado salvo com sucesso!";
    toast.success(mensagem);
    setModalAberto(false);
    setRelatorioEditando(null);
  };

  const handleCancelarModal = () => {
    setModalAberto(false);
    setRelatorioEditando(null);
  };

  const getPeriodicidadeBadge = (periodicidade: string) => {
    const colors = {
      "Diário": "bg-green-100 text-green-800",
      "Semanal": "bg-blue-100 text-blue-800", 
      "Mensal": "bg-purple-100 text-purple-800"
    };
    return colors[periodicidade as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Relatórios Personalizados</span>
              </CardTitle>
              <CardDescription>
                Gerencie seus relatórios customizados
              </CardDescription>
            </div>
            <Button onClick={handleNovoRelatorio} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Relatório</TableHead>
                <TableHead>Periodicidade</TableHead>
                <TableHead>Campos</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatoriosCustomizados.map((relatorio) => (
                <TableRow key={relatorio.id}>
                  <TableCell className="font-medium">{relatorio.nome}</TableCell>
                  <TableCell>
                    <Badge className={getPeriodicidadeBadge(relatorio.periodicidade)}>
                      {relatorio.periodicidade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {relatorio.camposSelecionados.length} campos selecionados
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(relatorio.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditarRelatorio(relatorio)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExcluirRelatorio(relatorio.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NovoRelatorioModal
        open={modalAberto}
        onOpenChange={setModalAberto}
        onSave={handleSalvarRelatorio}
        onCancel={handleCancelarModal}
      />
    </div>
  );
}
