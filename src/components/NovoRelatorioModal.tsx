
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface NovoRelatorioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const camposDisponiveis = [
  { id: "numero_proposta", nome: "Número da Proposta", categoria: "Proposta" },
  { id: "cpf_cliente", nome: "CPF do Cliente", categoria: "Cliente" },
  { id: "nome_cliente", nome: "Nome do Cliente", categoria: "Cliente" },
  { id: "valor_solicitado", nome: "Valor Solicitado", categoria: "Financeiro" },
  { id: "valor_aprovado", nome: "Valor Aprovado", categoria: "Financeiro" },
  { id: "taxa_juros", nome: "Taxa de Juros", categoria: "Financeiro" },
  { id: "prazo_pagamento", nome: "Prazo de Pagamento", categoria: "Financeiro" },
  { id: "status_proposta", nome: "Status da Proposta", categoria: "Proposta" },
  { id: "data_criacao", nome: "Data de Criação", categoria: "Proposta" },
  { id: "data_aprovacao", nome: "Data de Aprovação", categoria: "Proposta" },
  { id: "banco_origem", nome: "Banco de Origem", categoria: "Bancário" },
  { id: "agencia", nome: "Agência", categoria: "Bancário" },
  { id: "conta", nome: "Conta", categoria: "Bancário" },
  { id: "tipo_conta", nome: "Tipo de Conta", categoria: "Bancário" },
  { id: "canal_origem", nome: "Canal de Origem", categoria: "Origem" },
  { id: "produto", nome: "Produto", categoria: "Produto" },
  { id: "convenio", nome: "Convênio", categoria: "Produto" },
  { id: "margem_disponivel", nome: "Margem Disponível", categoria: "Financeiro" },
  { id: "score_cliente", nome: "Score do Cliente", categoria: "Cliente" },
  { id: "renda_declarada", nome: "Renda Declarada", categoria: "Cliente" },
];

const diasSemana = [
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
  { value: "0", label: "Domingo" },
];

export function NovoRelatorioModal({ open, onOpenChange, onSave, onCancel }: NovoRelatorioModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [nomeRelatorio, setNomeRelatorio] = useState("");
  const [descricaoRelatorio, setDescricaoRelatorio] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [diaMes, setDiaMes] = useState("");

  const form = useForm();

  const camposFiltrados = camposDisponiveis.filter(campo =>
    campo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campo.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSave = () => {
    // Aqui você pode adicionar validações se necessário
    console.log({
      nome: nomeRelatorio,
      descricao: descricaoRelatorio,
      campos: selectedFields,
      frequencia,
      diaSemana,
      diaMes
    });
    onSave();
  };

  const handleCancel = () => {
    // Limpar formulário
    setNomeRelatorio("");
    setDescricaoRelatorio("");
    setSelectedFields([]);
    setFrequencia("");
    setDiaSemana("");
    setDiaMes("");
    setSearchTerm("");
    onCancel();
  };

  const categorias = [...new Set(camposFiltrados.map(campo => campo.categoria))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
              <Label htmlFor="descricaoRelatorio">Descrição</Label>
              <Input
                id="descricaoRelatorio"
                placeholder="Digite uma descrição para o relatório"
                value={descricaoRelatorio}
                onChange={(e) => setDescricaoRelatorio(e.target.value)}
              />
            </div>
          </div>

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
              {categorias.map(categoria => (
                <div key={categoria}>
                  <h4 className="font-medium text-blue-600 mb-2">{categoria}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {camposFiltrados
                      .filter(campo => campo.categoria === categoria)
                      .map(campo => (
                        <div key={campo.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={campo.id}
                            checked={selectedFields.includes(campo.id)}
                            onCheckedChange={() => handleFieldToggle(campo.id)}
                          />
                          <Label htmlFor={campo.id} className="text-sm cursor-pointer">
                            {campo.nome}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuração de agendamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Agendamento do Relatório</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select value={frequencia} onValueChange={setFrequencia}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diario">Diário</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {frequencia === "semanal" && (
                <div className="space-y-2">
                  <Label>Dia da Semana</Label>
                  <Select value={diaSemana} onValueChange={setDiaSemana}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {diasSemana.map(dia => (
                        <SelectItem key={dia.value} value={dia.value}>
                          {dia.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {frequencia === "mensal" && (
                <div className="space-y-2">
                  <Label>Dia do Mês</Label>
                  <Select value={diaMes} onValueChange={setDiaMes}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(dia => (
                        <SelectItem key={dia} value={dia.toString()}>
                          Dia {dia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!nomeRelatorio || selectedFields.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
