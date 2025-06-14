
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Search, Download } from "lucide-react";
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
    
    // Simular consulta com dados de exemplo similares à imagem
    setTimeout(() => {
      const mockData: RelatorioItem[] = [
        {
          documento: "11.581.339/0001-45",
          nome: "MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR",
          periodo: "Apr-25",
          numeroTransacoes: 18,
          criterio: "Consulta Padrão",
          bureau: "SCR",
          origem: "BMP Digital"
        },
        {
          documento: "11.581.339/0001-45",
          nome: "MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR",
          periodo: "Apr-25",
          numeroTransacoes: 18,
          criterio: "Consulta Padrão",
          bureau: "SCR",
          origem: "DBS"
        },
        {
          documento: "11.581.339/0001-45",
          nome: "MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR",
          periodo: "May-25",
          numeroTransacoes: 103,
          criterio: "Consulta Padrão",
          bureau: "SCR",
          origem: "DBS"
        },
        {
          documento: "11.581.339/0001-45",
          nome: "MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR",
          periodo: "May-25",
          numeroTransacoes: 1,
          criterio: "Consulta Padrão",
          bureau: "SCR",
          origem: "BMP Cred"
        },
        {
          documento: "11.581.339/0001-45",
          nome: "MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR",
          periodo: "Jun-25",
          numeroTransacoes: 13,
          criterio: "Consulta Padrão",
          bureau: "SCR",
          origem: "DBS"
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
      description: `Enviando relatório detalhado para o e-mail cadastrado. Documento: ${item.documento}`,
    });
    
    // Aqui seria implementada a lógica real de envio do e-mail com o relatório
    console.log("Enviando relatório detalhado para:", item);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Exportar para Excel",
      description: "Exportando dados para Excel...",
    });
    
    // Aqui seria implementada a lógica real de exportação
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
                    <TableHead className="font-semibold">Documento</TableHead>
                    <TableHead className="font-semibold">Nome</TableHead>
                    <TableHead className="font-semibold text-center">Período</TableHead>
                    <TableHead className="font-semibold text-center">Nº Tran.</TableHead>
                    <TableHead className="font-semibold">Critério</TableHead>
                    <TableHead className="font-semibold text-center">Bureau</TableHead>
                    <TableHead className="font-semibold">Origem</TableHead>
                    <TableHead className="font-semibold text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-blue-600">
                        {item.documento}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={item.nome}>
                          {item.nome}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.periodo}</TableCell>
                      <TableCell className="text-center">{item.numeroTransacoes}</TableCell>
                      <TableCell>{item.criterio}</TableCell>
                      <TableCell className="text-center">{item.bureau}</TableCell>
                      <TableCell>{item.origem}</TableCell>
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
              
              {/* Paginação info */}
              <div className="mt-4 text-sm text-gray-500 text-right">
                Exibindo itens 1 - {resultados.length} de {resultados.length}
              </div>
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
