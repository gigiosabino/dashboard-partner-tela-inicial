
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Settings, Download, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const padroesSalvos = [
  {
    id: 1,
    nome: "Padrão CAAS",
    descricao: "Relatório padrão com dados principais do CAAS",
    campos: ["Número CCB", "Cliente", "Valor", "Situação", "Data"],
    ativo: true
  },
  {
    id: 2,
    nome: "Padrão FGTS",
    descricao: "Relatório específico para dados do FGTS",
    campos: ["Número CCB", "CPF", "Valor FGTS", "Status FGTS", "Data Liberação"],
    ativo: true
  },
  {
    id: 3,
    nome: "Padrão Financeiro",
    descricao: "Relatório com foco em dados financeiros",
    campos: ["Número CCB", "Valor Solicitado", "Valor Aprovado", "Juros", "Parcelas"],
    ativo: false
  }
];

const camposDisponiveis = [
  "Número CCB",
  "Cliente",
  "CPF/CNPJ",
  "Valor Solicitado",
  "Valor Aprovado",
  "Situação",
  "Data Criação",
  "Data Aprovação",
  "Vendedor",
  "Tipo Contrato",
  "Parcelas",
  "Taxa Juros",
  "Valor FGTS",
  "Status FGTS",
  "Data Liberação"
];

export function RelatoriosCaasContent() {
  const [tipoRelatorio, setTipoRelatorio] = useState("padrao");
  const [padraoSelecionado, setPadraoSelecionado] = useState("");
  const [novoPadraoNome, setNovoPadraoNome] = useState("");
  const [novoPadraoDescricao, setNovoPadraoDescricao] = useState("");
  const [camposSelecionados, setCamposSelecionados] = useState<string[]>([]);

  const handleCampoToggle = (campo: string) => {
    setCamposSelecionados(prev =>
      prev.includes(campo)
        ? prev.filter(c => c !== campo)
        : [...prev, campo]
    );
  };

  const handleSalvarPadrao = () => {
    if (novoPadraoNome && camposSelecionados.length > 0) {
      console.log("Salvando novo padrão:", {
        nome: novoPadraoNome,
        descricao: novoPadraoDescricao,
        campos: camposSelecionados
      });
      // Aqui seria a lógica para salvar o padrão
      setNovoPadraoNome("");
      setNovoPadraoDescricao("");
      setCamposSelecionados([]);
    }
  };

  const NovoPadraoModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Criar Novo Padrão
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Padrão</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Padrão:</label>
            <Input
              placeholder="Ex: Padrão Consignado"
              value={novoPadraoNome}
              onChange={(e) => setNovoPadraoNome(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descrição:</label>
            <Input
              placeholder="Descrição do padrão"
              value={novoPadraoDescricao}
              onChange={(e) => setNovoPadraoDescricao(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Campos do Relatório:</label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded p-3">
              {camposDisponiveis.map((campo) => (
                <label key={campo} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={camposSelecionados.includes(campo)}
                    onChange={() => handleCampoToggle(campo)}
                    className="rounded"
                  />
                  <span className="text-sm">{campo}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {camposSelecionados.length} campo(s) selecionado(s)
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button 
              onClick={handleSalvarPadrao}
              disabled={!novoPadraoNome || camposSelecionados.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Padrão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Relatórios CAAS</h1>
              <p className="text-sm text-gray-600">Gere relatórios personalizados com padrões pré-definidos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Tipo de Relatório */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Relatório</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRelatorio"
                  value="padrao"
                  checked={tipoRelatorio === "padrao"}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                />
                <span>Usar Padrão Existente</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoRelatorio"
                  value="personalizado"
                  checked={tipoRelatorio === "personalizado"}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                />
                <span>Personalizado</span>
              </label>
            </div>

            {tipoRelatorio === "padrao" && (
              <div>
                <label className="block text-sm font-medium mb-2">Selecione um Padrão:</label>
                <Select value={padraoSelecionado} onValueChange={setPadraoSelecionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um padrão salvo" />
                  </SelectTrigger>
                  <SelectContent>
                    {padroesSalvos.filter(p => p.ativo).map((padrao) => (
                      <SelectItem key={padrao.id} value={padrao.id.toString()}>
                        {padrao.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {tipoRelatorio === "personalizado" && (
              <div>
                <label className="block text-sm font-medium mb-2">Campos do Relatório:</label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded p-3">
                  {camposDisponiveis.map((campo) => (
                    <label key={campo} className="flex items-center space-x-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={camposSelecionados.includes(campo)}
                        onChange={() => handleCampoToggle(campo)}
                        className="rounded"
                      />
                      <span>{campo}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
              
              {tipoRelatorio === "personalizado" && (
                <NovoPadraoModal />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Padrões Salvos */}
        <Card>
          <CardHeader>
            <CardTitle>Padrões Salvos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {padroesSalvos.map((padrao) => (
                <div key={padrao.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{padrao.nome}</h3>
                      <Badge variant={padrao.ativo ? "default" : "secondary"}>
                        {padrao.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{padrao.descricao}</p>
                    <p className="text-xs text-gray-500">
                      {padrao.campos.length} campos: {padrao.campos.slice(0, 3).join(", ")}
                      {padrao.campos.length > 3 && "..."}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
