
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RelatorioItem {
  documento: string;
  nome: string;
  periodo: string;
  numeroTransacoes: number;
  criterio: string;
  bureau: string;
  origem: string;
}

export function RelatoriosServicosContent() {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [resultados, setResultados] = useState<RelatorioItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleConsultar = async () => {
    if (!dataInicial || !dataFinal) {
      toast({
        title: "Erro",
        description: "Por favor, preencha as datas inicial e final.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simular consulta - em produção seria uma chamada real à API
    setTimeout(() => {
      const mockData: RelatorioItem[] = [
        {
          documento: "12.345.678/0001-90",
          nome: "Empresa Exemplo LTDA",
          periodo: `${dataInicial} - ${dataFinal}`,
          numeroTransacoes: 150,
          criterio: "Consulta Automática",
          bureau: "SCR - Bacen",
          origem: "Partner Portal"
        }
      ];
      
      setResultados(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleRelatorioDetalhado = (item: RelatorioItem) => {
    toast({
      title: "Relatório Detalhado",
      description: `Enviando relatório detalhado para o e-mail cadastrado. Documento: ${item.documento}`,
    });
    
    // Aqui seria implementada a lógica real de envio do e-mail com o relatório
    console.log("Enviando relatório detalhado para:", item);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
              <Label htmlFor="dataInicial">Data Inicial</Label>
              <Input 
                id="dataInicial"
                type="date"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="dataFinal">Data Final</Label>
              <Input 
                id="dataFinal"
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
              />
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
        <CardHeader>
          <CardTitle className="text-lg">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          {resultados.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Nº Transações</TableHead>
                  <TableHead>Critério</TableHead>
                  <TableHead>Bureau</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultados.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.documento}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.periodo}</TableCell>
                    <TableCell>{item.numeroTransacoes}</TableCell>
                    <TableCell>{item.criterio}</TableCell>
                    <TableCell>{item.bureau}</TableCell>
                    <TableCell>{item.origem}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRelatorioDetalhado(item)}
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Relatório detalhado
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
