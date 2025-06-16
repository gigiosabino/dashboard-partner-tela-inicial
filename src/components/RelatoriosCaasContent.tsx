
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Download } from "lucide-react";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { exportToCSV } from "@/utils/csvExport";

interface FieldConfig {
  id: string;
  label: string;
  category: string;
}

const fieldsConfig: FieldConfig[] = [
  // Proposta
  { id: "nro_proposta", label: "Nro proposta", category: "Proposta" },
  { id: "nome_empresa", label: "Nome da empresa", category: "Proposta" },
  { id: "nome_parceiro", label: "Nome do parceiro correspondente", category: "Proposta" },
  { id: "vendedor", label: "Vendedor", category: "Proposta" },
  { id: "produto", label: "Produto", category: "Proposta" },
  { id: "cnpj_empresa", label: "CNPJ Empresa", category: "Proposta" },
  { id: "cnpj_parceiro", label: "CNPJ Parceiro correspondente", category: "Proposta" },
  { id: "tipo_contrato", label: "Tipo de contrato", category: "Proposta" },
  
  // Valores
  { id: "valor_solicitado", label: "Valor solicitado", category: "Valores" },
  { id: "valor_financiado", label: "Valor financiado", category: "Valores" },
  { id: "valor_total_divida", label: "Valor total da dívida", category: "Valores" },
  { id: "prazo", label: "Prazo", category: "Valores" },
  { id: "valor_aprovado", label: "Valor aprovado", category: "Valores" },
  { id: "valor_parcela", label: "Valor da parcela", category: "Valores" },
  { id: "taxa_juros_am", label: "Taxa de juros A.M", category: "Valores" },
  { id: "taxa_juros_aa", label: "Taxa de juros A.A", category: "Valores" },
  { id: "cet_am", label: "CET A.M", category: "Valores" },
  { id: "cet_aa", label: "CET A.A", category: "Valores" },
  { id: "valor_tc", label: "Valor TC", category: "Valores" },
  { id: "valor_iof", label: "Valor IOF", category: "Valores" },
  { id: "valor_outros_servicos", label: "Valor outros serviços", category: "Valores" },
  { id: "valor_outras_despesas", label: "Valor outras despesas", category: "Valores" },
  
  // Datas
  { id: "data_criacao", label: "Data de criação", category: "Datas" },
  { id: "data_pendencia", label: "Data da pendência", category: "Datas" },
  { id: "data_pagamento", label: "Data de pagamento", category: "Datas" },
  { id: "data_aprovacao", label: "Data de aprovação", category: "Datas" },
  { id: "data_liberacao", label: "Data de liberação", category: "Datas" },
  { id: "data_ultima_alteracao", label: "Data da última alteração de status", category: "Datas" },
  { id: "data_finalizacao", label: "Data de finalização", category: "Datas" },
  { id: "data_cessao", label: "Data de Cessão", category: "Datas" },
  { id: "data_pendencia_pagamento", label: "Data da pendência de pagamento", category: "Datas" },
  
  // Parcela
  { id: "valor_principal", label: "Valor principal", category: "Parcela" },
  { id: "valor_encargos", label: "Valor de encargos", category: "Parcela" },
  { id: "linha_digitavel", label: "Linha digitável", category: "Parcela" },
  { id: "data_vencimento", label: "Data de vencimento", category: "Parcela" },
  { id: "numero_parcela", label: "Número da parcela", category: "Parcela" },
  { id: "primeiro_vencimento", label: "Primeiro vencimento", category: "Parcela" },
  
  // Desembolso
  { id: "valor_desembolsado", label: "Valor desembolsado", category: "Desembolso" },
  { id: "numero_banco", label: "Número do banco", category: "Desembolso" },
  { id: "conta", label: "Conta", category: "Desembolso" },
  { id: "data_pagamento_desembolso", label: "Data de Pagamento", category: "Desembolso" },
  { id: "agencia", label: "Agência", category: "Desembolso" },
  { id: "conta_digito", label: "Conta dígito", category: "Desembolso" },
  { id: "tipo_conta", label: "Tipo de conta", category: "Desembolso" },
  { id: "agencia_digito", label: "Agência dígito", category: "Desembolso" },
  { id: "cpf_cnpj_beneficiario", label: "CPF/CNPJ do beneficiário", category: "Desembolso" },
  
  // Split
  { id: "valor_transacao", label: "Valor transação", category: "Split" },
  { id: "banco", label: "Banco", category: "Split" },
  { id: "agencia_digito_split", label: "Agência Dígito", category: "Split" },
  { id: "cpf_cnpj_beneficiario_split", label: "CPF/CNPJ do beneficiário", category: "Split" },
  { id: "nome_cedente", label: "Nome do Cedente", category: "Split" },
  { id: "data_pagamento_split", label: "Data de Pagamento", category: "Split" },
  { id: "tipo_conta_split", label: "Tipo de conta", category: "Split" },
  { id: "conta_split", label: "Conta", category: "Split" },
  { id: "nome_beneficiario", label: "Nome do beneficiário", category: "Split" },
  { id: "linha_digitavel_split", label: "Linha digitável", category: "Split" },
  { id: "agencia_split", label: "Agência", category: "Split" },
  { id: "conta_digito_split", label: "Conta dígito", category: "Split" },
  { id: "cpf_cnpj_cedente", label: "CPF/CNPJ do Cedente", category: "Split" },
];

export function RelatoriosCaasContent() {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>(null);

  const categories = Array.from(new Set(fieldsConfig.map(field => field.category)));

  const handleFieldToggle = (fieldId: string, checked: boolean) => {
    if (checked) {
      setSelectedFields(prev => [...prev, fieldId]);
    } else {
      setSelectedFields(prev => prev.filter(id => id !== fieldId));
    }
  };

  const handleCategoryToggle = (category: string, checked: boolean) => {
    const categoryFields = fieldsConfig
      .filter(field => field.category === category)
      .map(field => field.id);
    
    if (checked) {
      setSelectedFields(prev => [...new Set([...prev, ...categoryFields])]);
    } else {
      setSelectedFields(prev => prev.filter(id => !categoryFields.includes(id)));
    }
  };

  const isCategorySelected = (category: string) => {
    const categoryFields = fieldsConfig
      .filter(field => field.category === category)
      .map(field => field.id);
    return categoryFields.every(fieldId => selectedFields.includes(fieldId));
  };

  const isCategoryPartiallySelected = (category: string) => {
    const categoryFields = fieldsConfig
      .filter(field => field.category === category)
      .map(field => field.id);
    return categoryFields.some(fieldId => selectedFields.includes(fieldId)) && 
           !categoryFields.every(fieldId => selectedFields.includes(fieldId));
  };

  const handleGenerateReport = () => {
    if (selectedFields.length === 0) {
      alert("Selecione pelo menos um campo para gerar o relatório");
      return;
    }

    // Mock data for demonstration
    const mockData = [
      {
        nro_proposta: "PROP-001",
        nome_empresa: "Empresa Exemplo LTDA",
        valor_solicitado: "R$ 50.000,00",
        data_criacao: "2024-01-15",
        // Add more mock fields as needed
      }
    ];

    const selectedFieldLabels = fieldsConfig
      .filter(field => selectedFields.includes(field.id))
      .map(field => field.label);

    exportToCSV(mockData, "relatorio-caas.csv", selectedFields);
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Relatórios CAAS</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filtros de Data */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Período</Label>
                <DatePickerWithRange 
                  date={dateRange} 
                  setDate={setDateRange}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleGenerateReport}
                  className="w-full"
                  disabled={selectedFields.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Gerar relatório
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Campos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Selecionar Campos do Relatório</CardTitle>
              <p className="text-sm text-gray-600">
                Escolha os campos que deseja incluir no relatório ({selectedFields.length} selecionados)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center space-x-2 border-b pb-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={isCategorySelected(category)}
                        onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                        className={isCategoryPartiallySelected(category) ? "data-[state=checked]:bg-blue-500" : ""}
                      />
                      <Label 
                        htmlFor={`category-${category}`}
                        className="font-semibold text-gray-900 cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                    
                    <div className="space-y-2 pl-6">
                      {fieldsConfig
                        .filter(field => field.category === category)
                        .map((field) => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={field.id}
                              checked={selectedFields.includes(field.id)}
                              onCheckedChange={(checked) => handleFieldToggle(field.id, checked as boolean)}
                            />
                            <Label 
                              htmlFor={field.id}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {field.label}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
