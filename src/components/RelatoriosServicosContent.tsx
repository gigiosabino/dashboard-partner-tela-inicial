import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Search, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { MonthYearPicker } from "./MonthYearPicker";

interface RelatorioItem {
  periodo: string;
  numeroTransacoes: number;
  criterio: string;
  bureau: string;
}

export function RelatoriosServicosContent() {
  const [mesInicial, setMesInicial] = useState("");
  const [mesFinal, setMesFinal] = useState("");
  const [resultados, setResultados] = useState<RelatorioItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Validar se o intervalo é de no máximo 3 meses
  const validarIntervalo = (inicial: string, final: string) => {
    if (!inicial || !final) return true;
    
    const [anoIni, mesIni] = inicial.split('-').map(Number);
    const [anoFin, mesFin] = final.split('-').map(Number);
    
    const dataInicial = new Date(anoIni, mesIni - 1);
    const dataFinal = new Date(anoFin, mesFin - 1);
    
    const diffMeses = (dataFinal.getFullYear() - dataInicial.getFullYear()) * 12 + (dataFinal.getMonth() - dataInicial.getMonth());
    
    return diffMeses >= 0 && diffMeses <= 2; // máximo 3 meses (0, 1, 2)
  };

  const handleMesInicialChange = (value: string) => {
    setMesInicial(value);
    
    // Reset mês final se não for válido
    if (mesFinal && !validarIntervalo(value, mesFinal)) {
      setMesFinal("");
    }
  };

  const handleMesFinalChange = (value: string) => {
    if (validarIntervalo(mesInicial, value)) {
      setMesFinal(value);
    } else {
      toast({
        title: "Erro",
        description: "O intervalo máximo permitido é de 3 meses.",
        variant: "destructive"
      });
    }
  };

  const handleConsultar = async () => {
    if (!mesInicial || !mesFinal) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos de período.",
        variant: "destructive"
      });
      return;
    }

    if (!validarIntervalo(mesInicial, mesFinal)) {
      toast({
        title: "Erro",
        description: "O intervalo máximo permitido é de 3 meses.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simular consulta com 1 registro por mês
    setTimeout(() => {
      const [anoIni, mesIni] = mesInicial.split('-').map(Number);
      const [anoFin, mesFin] = mesFinal.split('-').map(Number);
      
      const mockData: RelatorioItem[] = [];
      
      // Gerar 1 linha por mês no intervalo
      let currentYear = anoIni;
      let currentMonth = mesIni;
      
      while (currentYear < anoFin || (currentYear === anoFin && currentMonth <= mesFin)) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const periodo = `${monthNames[currentMonth - 1]}-${currentYear.toString().slice(-2)}`;
        
        mockData.push({
          periodo,
          numeroTransacoes: Math.floor(Math.random() * 100) + 20, // Entre 20 e 119 transações
          criterio: "Consulta Padrão",
          bureau: "SCR"
        });
        
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
      
      setResultados(mockData);
      setLoading(false);
      
      // Toast com fundo verde para sucesso
      toast({
        title: "Consulta realizada",
        description: `${mockData.length} registros encontrados.`,
        className: "bg-green-500 border-green-500 text-white"
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
    <div className="flex-1 p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Relatórios de Serviços Integrados
        </h1>
        <p className="text-slate-600">
          Consulte os relatórios de serviços integrados da sua empresa
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-6 bg-white border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-lg text-slate-800">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="bureau" className="text-slate-700 font-medium">Bureau</Label>
              <Select value="SCR - Bacen" disabled>
                <SelectTrigger className="bg-slate-100 border-slate-300 text-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="SCR - Bacen">SCR - Bacen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mesInicial" className="text-slate-700 font-medium">Mês Inicial</Label>
              <MonthYearPicker
                value={mesInicial}
                onSelect={handleMesInicialChange}
                placeholder="Selecione mês inicial"
              />
            </div>
            
            <div>
              <Label htmlFor="mesFinal" className="text-slate-700 font-medium">Mês Final</Label>
              <MonthYearPicker
                value={mesFinal}
                onSelect={handleMesFinalChange}
                placeholder="Selecione mês final"
                disabled={!mesInicial}
              />
            </div>
            
            <div>
              <Button 
                onClick={handleConsultar}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Consultando..." : "Consultar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-lg text-slate-800">Resultados</CardTitle>
          {resultados.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleExportToExcel}
              className="flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
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
                  <TableRow className="bg-slate-50 border-slate-200">
                    <TableHead className="font-semibold text-center text-slate-700">Período</TableHead>
                    <TableHead className="font-semibold text-center text-slate-700">Nº Tran.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Critério</TableHead>
                    <TableHead className="font-semibold text-center text-slate-700">Bureau</TableHead>
                    <TableHead className="font-semibold text-center text-slate-700">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((item, index) => (
                    <TableRow key={index} className="hover:bg-slate-50 border-slate-200">
                      <TableCell className="text-center text-slate-700">{item.periodo}</TableCell>
                      <TableCell className="text-center text-slate-700">{item.numeroTransacoes}</TableCell>
                      <TableCell className="text-slate-700">{item.criterio}</TableCell>
                      <TableCell className="text-center text-slate-700">{item.bureau}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRelatorioDetalhado(item)}
                          className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-medium"
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
            <div className="text-center py-8 text-slate-500">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Nenhum resultado encontrado</p>
              <p className="text-sm">Use os filtros acima para realizar uma consulta</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
