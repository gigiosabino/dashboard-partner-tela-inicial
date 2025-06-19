import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, Download, Calendar, FileText, Settings, BarChart3 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GlobalHeader } from "@/components/GlobalHeader";
import { NovoRelatorioModal } from "@/components/NovoRelatorioModal";
import { useNavigate } from "react-router-dom";

const relatoriosGerados = [
  {
    id: 1,
    nome: "Relatório Mensal - Junho 2025",
    tipo: "Geral",
    dataGeracao: "05/06/2025 14:30",
    status: "Concluído",
    tamanho: "2.5 MB"
  },
  {
    id: 2,
    nome: "Análise de Performance",
    tipo: "Personalizado",
    dataGeracao: "04/06/2025 16:45",
    status: "Processando",
    tamanho: "-"
  }
];

const relatoriosPersonalizados = [
  {
    id: 1,
    nome: "Propostas por Status",
    descricao: "Relatório detalhado das propostas segmentadas por status",
    ultimaExecucao: "05/06/2025"
  },
  {
    id: 2,
    nome: "Performance Mensal",
    descricao: "Análise de performance mensal com métricas principais",
    ultimaExecucao: "01/06/2025"
  }
];

export function RelatoriosCaasContent() {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [isNovoRelatorioModalOpen, setIsNovoRelatorioModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gerador");
  const navigate = useNavigate();

  const handleNovoRelatorio = () => {
    setIsNovoRelatorioModalOpen(true);
  };

  const handleSaveRelatorio = () => {
    setIsNovoRelatorioModalOpen(false);
    setActiveTab("personalizados");
  };

  const handleCancelRelatorio = () => {
    setIsNovoRelatorioModalOpen(false);
    navigate("/relatorios-caas");
  };

  return (
    <div className="flex-1 bg-gray-50">
      <GlobalHeader 
        title="Relatórios CAAS" 
        subtitle="Central de Análise e Acompanhamento de Sistemas" 
      />

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="gerador" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Gerador de Relatórios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="personalizados" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Relatórios Personalizados</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gerados" 
              className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 py-3 px-6 rounded-md"
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Relatórios Gerados</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gerador">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Gerador de Relatórios</span>
                </CardTitle>
                <CardDescription>
                  Configure e gere relatórios personalizados conforme suas necessidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Tipo de Relatório</Label>
                    <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de relatório" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="propostas">Relatório de Propostas</SelectItem>
                        <SelectItem value="performance">Relatório de Performance</SelectItem>
                        <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
                        <SelectItem value="operacional">Relatório Operacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Período</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
                        <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
                        <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
                        <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
                        <SelectItem value="custom">Período personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {dateRange === "custom" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data Inicial</Label>
                      <Input type="date" id="startDate" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Data Final</Label>
                      <Input type="date" id="endDate" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Relatório
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalizados">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>Relatórios Personalizados</span>
                </CardTitle>
                <CardDescription>
                  Gerencie seus modelos de relatórios personalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar relatórios personalizados" 
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    onClick={handleNovoRelatorio}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Novo Relatório
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatoriosPersonalizados.map((relatorio) => (
                    <Card key={relatorio.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                        <CardDescription className="text-sm">
                          {relatorio.descricao}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Última execução: {relatorio.ultimaExecucao}
                          </span>
                          <Button size="sm" variant="outline">
                            Executar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gerados">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Relatórios Gerados</span>
                </CardTitle>
                <CardDescription>
                  Acesse e faça download dos relatórios já processados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                    <span className="text-sm text-gray-600">
                      {relatoriosGerados.length} relatório(s) encontrado(s)
                    </span>
                  </div>
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar relatórios gerados" 
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Relatório</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data de Geração</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relatoriosGerados.map((relatorio) => (
                      <TableRow key={relatorio.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{relatorio.nome}</TableCell>
                        <TableCell>{relatorio.tipo}</TableCell>
                        <TableCell>{relatorio.dataGeracao}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            relatorio.status === "Concluído" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {relatorio.status}
                          </span>
                        </TableCell>
                        <TableCell>{relatorio.tamanho}</TableCell>
                        <TableCell>
                          {relatorio.status === "Concluído" && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <NovoRelatorioModal
          open={isNovoRelatorioModalOpen}
          onOpenChange={setIsNovoRelatorioModalOpen}
          onSave={handleSaveRelatorio}
          onCancel={handleCancelRelatorio}
        />
      </main>
    </div>
  );
}
