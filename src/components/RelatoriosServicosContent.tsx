
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Search, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RelatorioItem {
  periodo: string;
  numeroTransacoes: number;
  criterio: string;
  bureau: string;
}

export function RelatoriosServicosContent() {
  const [mesInicial, setMesInicial] = useState("");
  const [anoInicial, setAnoInicial] = useState("");
  const [mesFinal, setMesFinal] = useState("");
  const [anoFinal, setAnoFinal] = useState("");
  const [resultados, setResultados] = useState<RelatorioItem[]>([]);
  const [loading, setLoading] = useState(false);

  const meses = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" }
  ];

  const anos = Array.from({ length: 10 }, (_, i) => {
    const ano = new Date().getFullYear() - i;
    return { value: ano.toString(), label: ano.toString() };
  });

  const handleConsultar = async () => {
    if (!mesInicial || !anoInicial || !mesFinal || !anoFinal) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos de período.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simular consulta com dados de exemplo
    setTimeout(() => {
      const mockData: RelatorioItem[] = [
        {
          periodo: "Apr-25",
          numeroTransacoes: 18,
          criterio: "Consulta Padrão",
          bureau: "SCR"
        },
        {
          periodo: "Apr-25",
          numeroTransacoes: 18,
          criterio: "Consulta Padrão",
          bureau: "SCR"
        },
        {
          periodo: "May-25",
          numeroTransacoes: 103,
          criterio: "Consulta Padrão",
          bureau: "SCR"
        },
        {
          periodo: "May-25",
          numeroTransacoes: 1,
          criterio: "Consulta Padrão",
          bureau: "SCR"
        },
        {
          periodo: "Jun-25",
          numeroTransacoes: 13,
          criterio: "Consulta Padrão",
          bureau: "SCR"
        }
      ];
      
      setResultados(mockData);
      setLoading(false);
      
      toast({
        title: "Consulta realizada",
        description: `${mockData.length} registros encontrados.`,
      });
    }, 1000);
  };

  const handleRelatorioDetalhado = (item: RelatorioItem) => {
    toast({
      title: "Relatório Detalhado",
      description: `Enviando relatório detalhado para o e-mail cadastrado. Período: ${item.periodo}`,
    });
    
    console.log("Enviando relatório detalhado para:", item);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Exportar para Excel",
      description: "Exportando dados para Excel...",
    });
    
    console.log("Exportando para Excel:", resultados);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Relatórios de Serviços Integrados
        </h1>
        <p className="text-gray-600">
          Consulte os relatórios de serviços integrados da sua empresa
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div>
              <Label htmlFor="bureau">Bureau</Label>
              <Input 
                id="bureau" 
                value="SCR - Bacen" 
                disabled 
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <Label htmlFor="mesInicial">Mês Inicial</Label>
              <Select value={mesInicial} onValueChange={setMesInicial}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.value} value={mes.value}>
                      {mes.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="anoInicial">Ano Inicial</Label>
              <Select value={anoInicial} onValueChange={setAnoInicial}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano.value} value={ano.value}>
                      {ano.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mesFinal">Mês Final</Label>
              <Select value={mesFinal} onValueChange={setMesFinal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.value} value={mes.value}>
                      {mes.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="anoFinal">Ano Final</Label>
              <Select value={anoFinal} onValueChange={setAnoFinal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano.value} value={ano.value}>
                      {ano.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Button 
                onClick={handleConsultar}
                disabled={loading}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Consultando..." : "Consultar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Resultados</CardTitle>
          {resultados.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleExportToExcel}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export to Excel
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {resultados.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-center">Período</TableHead>
                    <TableHead className="font-semibold text-center">Nº Tran.</TableHead>
                    <TableHead className="font-semibold">Critério</TableHead>
                    <TableHead className="font-semibold text-center">Bureau</TableHead>
                    <TableHead className="font-semibold text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="text-center">{item.periodo}</TableCell>
                      <TableCell className="text-center">{item.numeroTransacoes}</TableCell>
                      <TableCell>{item.criterio}</TableCell>
                      <TableCell className="text-center">{item.bureau}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRelatorioDetalhado(item)}
                          className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                        >
                          <FileSpreadsheet className="w-4 h-4 mr-1" />
                          Relatório detalhado
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum resultado encontrado</p>
              <p className="text-sm">Use os filtros acima para realizar uma consulta</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
