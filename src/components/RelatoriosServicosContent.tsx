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
      while (currentYear < anoFin || currentYear === anoFin && currentMonth <= mesFin) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const periodo = `${monthNames[currentMonth - 1]}-${currentYear.toString().slice(-2)}`;
        mockData.push({
          periodo,
          numeroTransacoes: Math.floor(Math.random() * 100) + 20,
          // Entre 20 e 119 transações
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
      description: `Enviando relatório detalhado para o e-mail cadastrado. Período: ${item.periodo}`
    });
    console.log("Enviando relatório detalhado para:", item);
  };
  const handleExportToExcel = () => {
    toast({
      title: "Exportar para Excel",
      description: "Exportando dados para Excel..."
    });
    console.log("Exportando para Excel:", resultados);
  };
  return <div className="flex-1 p-6">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="bureau">Bureau</Label>
              <Select value="SCR - Bacen" disabled>
                <SelectTrigger className="bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SCR - Bacen">SCR - Bacen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mesInicial">Mês Inicial</Label>
              <MonthYearPicker value={mesInicial} onSelect={handleMesInicialChange} placeholder="Selecione mês inicial" />
            </div>
            
            <div>
              <Label htmlFor="mesFinal">Mês Final</Label>
              <MonthYearPicker value={mesFinal} onSelect={handleMesFinalChange} placeholder="Selecione mês final" disabled={!mesInicial} />
            </div>
            
            <div>
              <Button onClick={handleConsultar} disabled={loading} className="w-full">
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
          {resultados.length > 0 && <Button variant="outline" onClick={handleExportToExcel} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export to Excel
            </Button>}
        </CardHeader>
        <CardContent>
          {resultados.length > 0 ? <div className="overflow-x-auto">
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
                  {resultados.map((item, index) => <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="text-center">{item.periodo}</TableCell>
                      <TableCell className="text-center">{item.numeroTransacoes}</TableCell>
                      <TableCell>{item.criterio}</TableCell>
                      <TableCell className="text-center">{item.bureau}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="default" size="sm" onClick={() => handleRelatorioDetalhado(item)}>
                          <FileSpreadsheet className="w-4 h-4 mr-1" />
                          Relatório detalhado
                        </Button>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div> : <div className="text-center py-8 text-gray-500">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum resultado encontrado</p>
              <p className="text-sm">Use os filtros acima para realizar uma consulta</p>
            </div>}
        </CardContent>
      </Card>
    </div>;
}
