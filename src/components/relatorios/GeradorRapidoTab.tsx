
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Mail } from "lucide-react";
import { toast } from "sonner";

const relatoriosConfigurados = [
  {
    id: "default",
    nome: "Relatório Padrão",
    descricao: "Relatório com campos essenciais pré-configurados",
    periodicidade: "Manual",
    campos: 12,
    tipo: "Padrão"
  },
  {
    id: "custom1",
    nome: "Relatório Completo de Propostas",
    descricao: "Relatório customizado com todos os dados de propostas",
    periodicidade: "Semanal",
    campos: 25,
    tipo: "Personalizado"
  },
  {
    id: "custom2",
    nome: "Relatório Financeiro",
    descricao: "Foco em dados financeiros e de desembolso",
    periodicidade: "Mensal",
    campos: 18,
    tipo: "Personalizado"
  }
];

export function GeradorRapidoTab() {
  const [selectedReport, setSelectedReport] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGerarRelatorio = async () => {
    if (!selectedReport) {
      toast.error("Selecione um relatório para gerar");
      return;
    }

    setIsGenerating(true);
    
    // Simular geração do relatório
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Relatório enviado para seu email e adicionado ao histórico!");
    }, 2000);
  };

  const getPeriodicidadeBadge = (periodicidade: string) => {
    const colors = {
      "Manual": "bg-gray-100 text-gray-800",
      "Semanal": "bg-blue-100 text-blue-800", 
      "Mensal": "bg-green-100 text-green-800"
    };
    return colors[periodicidade as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === "Padrão" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-orange-100 text-orange-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="w-5 h-5 text-blue-600" />
          <span>Gerador Rápido de Relatórios</span>
        </CardTitle>
        <CardDescription>
          Selecione um relatório configurado e gere-o imediatamente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Relatório</label>
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um relatório configurado..." />
            </SelectTrigger>
            <SelectContent>
              {relatoriosConfigurados.map((relatorio) => (
                <SelectItem key={relatorio.id} value={relatorio.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{relatorio.nome}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedReport && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              {(() => {
                const relatorio = relatoriosConfigurados.find(r => r.id === selectedReport)!;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{relatorio.nome}</h4>
                      <div className="flex space-x-2">
                        <Badge className={getTipoBadge(relatorio.tipo)}>
                          {relatorio.tipo}
                        </Badge>
                        <Badge className={getPeriodicidadeBadge(relatorio.periodicidade)}>
                          {relatorio.periodicidade}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatorio.campos} campos</span>
                      </span>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={handleGerarRelatorio}
            disabled={!selectedReport || isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Gerar Relatório
              </>
            )}
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Como funciona?</p>
              <p className="text-sm text-blue-700 mt-1">
                Após clicar em "Gerar Relatório", o arquivo será enviado para seu email 
                e automaticamente incluído no histórico de relatórios gerados.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
