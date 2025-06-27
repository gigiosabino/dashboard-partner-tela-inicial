
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText, Calendar, User, Filter } from "lucide-react";

const relatoriosGerados = [
  {
    id: 1,
    nome: "Relatório Padrão",
    dataGeracao: "27/06/2025 14:30",
    usuario: "João Silva",
    tamanho: "2.1 MB",
    status: "Concluído",
    tipoGeracao: "Manual"
  },
  {
    id: 2,
    nome: "Relatório Completo de Propostas",
    dataGeracao: "27/06/2025 08:00",
    usuario: "Gerado automaticamente",
    tamanho: "4.5 MB",
    status: "Concluído",
    tipoGeracao: "Automático"
  },
  {
    id: 3,
    nome: "Relatório Financeiro",
    dataGeracao: "26/06/2025 16:45",
    usuario: "Maria Santos",
    tamanho: "1.8 MB",
    status: "Concluído",
    tipoGeracao: "Manual"
  },
  {
    id: 4,
    nome: "Relatório Personalizado - Análise Mensal",
    dataGeracao: "25/06/2025 23:30",
    usuario: "Gerado automaticamente",
    tamanho: "3.2 MB",
    status: "Concluído",
    tipoGeracao: "Automático"
  },
  {
    id: 5,
    nome: "Relatório de Desembolso",
    dataGeracao: "25/06/2025 11:15",
    usuario: "Carlos Lima",
    tamanho: "890 KB",
    status: "Processando",
    tipoGeracao: "Manual"
  }
];

export function HistoricoRelatoriosTab() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRelatorios = relatoriosGerados.filter(relatorio =>
    relatorio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    relatorio.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Concluído":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Concluído</Badge>;
      case "Processando":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processando</Badge>;
      case "Erro":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Erro</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoGeracaoBadge = (tipo: string) => {
    return tipo === "Automático" 
      ? <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Automático</Badge>
      : <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Manual</Badge>;
  };

  const handleDownload = (relatorio: any) => {
    if (relatorio.status === "Concluído") {
      // Simular download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${relatorio.nome.replace(/\s+/g, '_')}.xlsx`;
      link.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Histórico de Relatórios</span>
        </CardTitle>
        <CardDescription>
          Visualize e faça download de todos os relatórios gerados
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
              {filteredRelatorios.length} relatório(s) encontrado(s)
            </span>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Buscar por nome ou usuário..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Relatório</TableHead>
              <TableHead>Data/Hora de Geração</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRelatorios.map((relatorio) => (
              <TableRow key={relatorio.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{relatorio.nome}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{relatorio.dataGeracao}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className={relatorio.usuario === "Gerado automaticamente" ? "italic text-gray-600" : ""}>
                      {relatorio.usuario}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {getTipoGeracaoBadge(relatorio.tipoGeracao)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(relatorio.status)}
                </TableCell>
                <TableCell>{relatorio.tamanho}</TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownload(relatorio)}
                    disabled={relatorio.status !== "Concluído"}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
