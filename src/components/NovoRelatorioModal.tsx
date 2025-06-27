
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Search, X, Save } from "lucide-react";

interface NovoRelatorioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const camposDisponiveis = {
  "PROPOSTA": [
    { id: "DocumentoCliente", nome: "Documento Cliente", tipo: "string" },
    { id: "DocumentoPromotor", nome: "Documento Promotor", tipo: "string" },
    { id: "DocumentoParceiroCorrespondente", nome: "Documento Parceiro Correspondente", tipo: "string" },
    { id: "CodigoOperacao", nome: "Código Operação", tipo: "string" },
    { id: "CodigoVersaoCCB", nome: "Código Versão CCB", tipo: "number" },
    { id: "TipoIndiceFinan", nome: "Tipo Índice Financeiro", tipo: "number" },
    { id: "PercIndiceFinan", nome: "Percentual Índice Financeiro", tipo: "number" },
    { id: "VrSolicitado", nome: "Valor Solicitado", tipo: "currency" },
    { id: "Prazo", nome: "Prazo", tipo: "number" },
    { id: "PercJurosNegociado", nome: "Percentual Juros Negociado", tipo: "percentage" },
    { id: "VrIOF", nome: "Valor IOF", tipo: "currency" },
    { id: "PercIOF", nome: "Percentual IOF", tipo: "percentage" },
    { id: "PercIOFAdicional", nome: "Percentual IOF Adicional", tipo: "percentage" },
    { id: "VrParcela", nome: "Valor Parcela", tipo: "currency" },
    { id: "VrTAC", nome: "Valor TAC", tipo: "currency" },
    { id: "VrBoleto", nome: "Valor Boleto", tipo: "currency" }
  ],
  "DATAS DA PROPOSTA": [
    { id: "DataCriacao", nome: "Data de Criação", tipo: "date" },
    { id: "DataAprovacao", nome: "Data de Aprovação", tipo: "date" },
    { id: "DataFinalizacao", nome: "Data de Finalização", tipo: "date" },
    { id: "DataLiberacao", nome: "Data de Liberação", tipo: "date" },
    { id: "DataCessao", nome: "Data de Cessão", tipo: "date" },
    { id: "DataPagamento", nome: "Data de Pagamento", tipo: "date" },
    { id: "DataPendenciaPagamento", nome: "Data de Pendência de Pagamento", tipo: "date" }
  ],
  "DESEMBOLSO": [
    { id: "CodigoBanco", nome: "Código Banco", tipo: "number" },
    { id: "TipoConta", nome: "Tipo Conta", tipo: "number" },
    { id: "Agencia", nome: "Agência", tipo: "string" },
    { id: "AgenciaDig", nome: "Dígito Agência", tipo: "string" },
    { id: "Conta", nome: "Conta", tipo: "string" },
    { id: "ContaDig", nome: "Dígito Conta", tipo: "string" },
    { id: "NumeroBanco", nome: "Número Banco", tipo: "string" },
    { id: "DocumentoFederalPagamento", nome: "Documento Federal Pagamento", tipo: "string" },
    { id: "NomePagamento", nome: "Nome Pagamento", tipo: "string" }
  ],
  "SPLIT": [
    { id: "CampoID", nome: "Campo ID", tipo: "string" },
    { id: "VlrTransacao", nome: "Valor Transação", tipo: "currency" },
    { id: "DtPagamento", nome: "Data Pagamento", tipo: "date" },
    { id: "LinhaDigitavel", nome: "Linha Digitável", tipo: "string" },
    { id: "CodigoBanco", nome: "Código Banco", tipo: "number" },
    { id: "NumeroBanco", nome: "Número Banco", tipo: "string" },
    { id: "TipoConta", nome: "Tipo Conta", tipo: "number" },
    { id: "DocumentoFederal", nome: "Documento Federal", tipo: "string" },
    { id: "NomePagamento", nome: "Nome Pagamento", tipo: "string" },
    { id: "DocumentoFederalCedente", nome: "Documento Federal Cedente", tipo: "string" },
    { id: "NomeCedente", nome: "Nome Cedente", tipo: "string" }
  ]
};

export function NovoRelatorioModal({ open, onOpenChange, onSave, onCancel }: NovoRelatorioModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [nomeRelatorio, setNomeRelatorio] = useState("");
  const [periodicidade, setPeriodicidade] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [diaMes, setDiaMes] = useState("");

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSave = () => {
    if (!nomeRelatorio.trim()) {
      return;
    }
    if (!periodicidade) {
      return;
    }
    if (selectedFields.length === 0) {
      return;
    }
    if (periodicidade === "Semanal" && !diaSemana) {
      return;
    }
    if (periodicidade === "Mensal" && !diaMes) {
      return;
    }

    onSave();
    handleCancel();
  };

  const handleCancel = () => {
    setNomeRelatorio("");
    setSelectedFields([]);
    setPeriodicidade("");
    setDiaSemana("");
    setDiaMes("");
    setSearchTerm("");
    onCancel();
  };

  const getTipoBadge = (tipo: string) => {
    const colors = {
      "string": "bg-blue-100 text-blue-800",
      "number": "bg-green-100 text-green-800",
      "currency": "bg-yellow-100 text-yellow-800",
      "percentage": "bg-purple-100 text-purple-800",
      "date": "bg-red-100 text-red-800"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const renderCalendarioMensal = () => {
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return (
      <div className="p-3 border rounded-lg bg-white">
        <div className="text-center mb-3">
          <h4 className="text-sm font-medium text-gray-800">Dia do mês</h4>
        </div>
        <div className="grid grid-cols-7 gap-1 max-w-xs mx-auto">
          {dias.map((dia) => (
            <button
              key={dia}
              type="button"
              onClick={() => setDiaMes(dia.toString())}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium
                transition-all duration-200
                ${diaMes === dia.toString() 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {dia}
            </button>
          ))}
        </div>
        {diaMes && (
          <div className="text-center mt-2">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              Dia {diaMes}
            </Badge>
          </div>
        )}
      </div>
    );
  };

  const renderSeletorSemanal = () => {
    const diasSemana = [
      { value: "1", label: "Segunda" },
      { value: "2", label: "Terça" },
      { value: "3", label: "Quarta" },
      { value: "4", label: "Quinta" },
      { value: "5", label: "Sexta" },
      { value: "6", label: "Sábado" },
      { value: "0", label: "Domingo" }
    ];

    return (
      <div className="p-3 border rounded-lg bg-white">
        <div className="text-center mb-3">
          <h4 className="text-sm font-medium text-gray-800">Dia da semana</h4>
        </div>
        <RadioGroup value={diaSemana} onValueChange={setDiaSemana} className="space-y-2">
          {diasSemana.map((dia) => (
            <div key={dia.value} className="flex items-center space-x-2">
              <RadioGroupItem value={dia.value} id={dia.value} />
              <Label htmlFor={dia.value} className="text-sm cursor-pointer">
                {dia.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {diaSemana && (
          <div className="mt-2">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              {diasSemana.find(d => d.value === diaSemana)?.label}
            </Badge>
          </div>
        )}
      </div>
    );
  };

  const camposFiltrados = Object.entries(camposDisponiveis).reduce((acc, [categoria, campos]) => {
    const filtrados = campos.filter(campo =>
      campo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtrados.length > 0) {
      acc[categoria] = filtrados;
    }
    return acc;
  }, {} as typeof camposDisponiveis);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Novo Relatório Personalizado</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeRelatorio">Nome do Relatório</Label>
              <Input
                id="nomeRelatorio"
                placeholder="Digite o nome do relatório"
                value={nomeRelatorio}
                onChange={(e) => setNomeRelatorio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Periodicidade</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={periodicidade === "Diário" ? "default" : "outline"}
                  onClick={() => setPeriodicidade("Diário")}
                  className="flex-1"
                >
                  Diário
                </Button>
                <Button
                  type="button"
                  variant={periodicidade === "Semanal" ? "default" : "outline"}
                  onClick={() => setPeriodicidade("Semanal")}
                  className="flex-1"
                >
                  Semanal
                </Button>
                <Button
                  type="button"
                  variant={periodicidade === "Mensal" ? "default" : "outline"}
                  onClick={() => setPeriodicidade("Mensal")}
                  className="flex-1"
                >
                  Mensal
                </Button>
              </div>
            </div>
          </div>

          {/* Seleção de periodicidade específica */}
          {periodicidade === "Semanal" && (
            <div className="space-y-2">
              <Label>Frequência</Label>
              {renderSeletorSemanal()}
            </div>
          )}

          {periodicidade === "Mensal" && (
            <div className="space-y-2">
              <Label>Frequência</Label>
              {renderCalendarioMensal()}
            </div>
          )}

          {/* Seleção de campos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Campos do Relatório</h3>
              <span className="text-sm text-gray-500">
                {selectedFields.length} campo(s) selecionado(s)
              </span>
            </div>

            {/* Busca de campos */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar campos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Lista de campos por categoria */}
            <div className="max-h-60 overflow-y-auto border rounded-lg p-4 space-y-4">
              {Object.entries(camposFiltrados).map(([categoria, campos]) => (
                <div key={categoria}>
                  <h4 className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2 mb-3">
                    {categoria}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {campos.map((campo) => (
                      <div key={campo.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={campo.id}
                          checked={selectedFields.includes(campo.id)}
                          onCheckedChange={() => handleFieldToggle(campo.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <label htmlFor={campo.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                            {campo.nome}
                          </label>
                          <div className="mt-1">
                            <Badge className={getTipoBadge(campo.tipo)}>
                              {campo.tipo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!nomeRelatorio || selectedFields.length === 0 || !periodicidade}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
