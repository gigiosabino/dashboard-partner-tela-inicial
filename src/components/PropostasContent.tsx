
import { useState } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Download, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

interface Proposta {
  numero: string;
  cliente: string;
  valor: number;
  dataContratacao: string;
}

export function PropostasContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propostas, setPropostas] = useState<Proposta[]>([
    { numero: "2024001234", cliente: "João da Silva", valor: 15000, dataContratacao: "10/01/2024" },
    { numero: "2024001235", cliente: "Maria Souza", valor: 25000, dataContratacao: "15/01/2024" },
    { numero: "2024001236", cliente: "José Santos", valor: 35000, dataContratacao: "20/01/2024" },
  ]);

  const filteredPropostas = propostas.filter(proposta =>
    proposta.numero.includes(searchTerm) ||
    proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <GlobalHeader title="Propostas Contratadas" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas Contratadas</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie as propostas contratadas
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filtrar Propostas
            </CardTitle>
            <CardDescription>
              Digite o número da proposta ou o nome do cliente para filtrar os resultados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="search">Número da Proposta / Cliente</Label>
                  <Input
                    type="search"
                    id="search"
                    placeholder="Digite para filtrar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {propostas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Propostas Encontradas</CardTitle>
              <CardDescription>
                {propostas.length} propostas encontradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número da Proposta</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data de Contratação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propostas.map((proposta) => (
                      <TableRow key={proposta.numero}>
                        <TableCell className="font-medium">{proposta.numero}</TableCell>
                        <TableCell>{proposta.cliente}</TableCell>
                        <TableCell>R$ {proposta.valor.toFixed(2)}</TableCell>
                        <TableCell>{proposta.dataContratacao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              asChild
                              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg ring-2 ring-blue-200 font-semibold"
                            >
                              <Link to={`/proposta-detalhes/${proposta.numero}`}>
                                <FileText className="h-3.5 w-3.5" />
                                Detalhes
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Baixar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
