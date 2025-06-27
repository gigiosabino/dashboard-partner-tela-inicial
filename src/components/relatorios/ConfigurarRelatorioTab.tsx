
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Settings, Calendar, Save, FileText } from "lucide-react";
import { toast } from "sonner";

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

const diasSemana = [
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
  { value: "0", label: "Domingo" }
];

export function ConfigurarRelatorioTab() {
  const [nomeRelatorio, setNomeRelatorio] = useState("");
  const [periodicidade, setPeriodicidade] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [diaMes, setDiaMes] = useState("");
  const [camposSelecionados, setCamposSelecionados] = useState<string[]>([]);

  const handleCampoChange = (campoId: string, checked: boolean) => {
    if (checked) {
      setCamposSelecionados([...camposSelecionados, campoId]);
    } else {
      setCamposSelecionados(camposSelecionados.filter(id => id !== campoId));
    }
  };

  const handleSalvarRelatorio = () => {
    if (!nomeRelatorio.trim()) {
      toast.error("Digite um nome para o relatório");
      return;
    }
    if (!periodicidade) {
      toast.error("Selecione a periodicidade");
      return;
    }
    if (camposSelecionados.length === 0) {
      toast.error("Selecione pelo menos um campo");
      return;
    }
    if (periodicidade === "Semanal" && !diaSemana) {
      toast.error("Selecione o dia da semana");
      return;
    }
    if (periodicidade === "Mensal" && !diaMes) {
      toast.error("Selecione o dia do mês");
      return;
    }

    toast.success("Relatório personalizado salvo com sucesso!");
    
    // Reset form
    setNomeRelatorio("");
    setPeriodicidade("");
    setDiaSemana("");
    setDiaMes("");
    setCamposSelecionados([]);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Configurar Relatório Personalizado</span>
          </CardTitle>
          <CardDescription>
            Crie relatórios customizados selecionando os campos e definindo a periodicidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nomeRelatorio">Nome do Relatório</Label>
              <Input
                id="nomeRelatorio"
                placeholder="Digite o nome do relatório..."
                value={nomeRelatorio}
                onChange={(e) => setNomeRelatorio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodicidade">Periodicidade</Label>
              <Select value={periodicidade} onValueChange={setPeriodicidade}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a periodicidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diario">Diário</SelectItem>
                  <SelectItem value="Semanal">Semanal</SelectItem>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {periodicidade === "Semanal" && (
            <div className="space-y-2">
              <Label htmlFor="diaSemana">Dia da Semana</Label>
              <Select value={diaSemana} onValueChange={setDiaSemana}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dia da semana" />
                </SelectTrigger>
                <SelectContent>
                  {diasSemana.map((dia) => (
                    <SelectItem key={dia.value} value={dia.value}>
                      {dia.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {periodicidade === "Mensal" && (
            <div className="space-y-2">
              <Label htmlFor="diaMes">Dia do Mês</Label>
              <Select value={diaMes} onValueChange={setDiaMes}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dia do mês" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                    <SelectItem key={dia} value={dia.toString()}>
                      Dia {dia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Seleção de Campos</span>
          </CardTitle>
          <CardDescription>
            Selecione os campos que deseja incluir no relatório ({camposSelecionados.length} selecionados)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(camposDisponiveis).map(([categoria, campos]) => (
              <div key={categoria} className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                  {categoria}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {campos.map((campo) => (
                    <div key={campo.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={campo.id}
                        checked={camposSelecionados.includes(campo.id)}
                        onCheckedChange={(checked) => handleCampoChange(campo.id, checked as boolean)}
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
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSalvarRelatorio} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Salvar Relatório
        </Button>
      </div>
    </div>
  );
}
