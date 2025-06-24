
import { useState } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Download, FileDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface CCBResult {
  numeroPropostaCompleto: string;
  ccbEncontrada: boolean;
  dataInclusao: string | null;
}

export function ConsultaCcbContent() {
  const [propostas, setPropostas] = useState("");
  const [resultados, setResultados] = useState<CCBResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simular consulta CCB
  const handleConsultar = async () => {
    if (!propostas.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira pelo menos um número de proposta.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Processar propostas (uma por linha)
    const listaPropostas = propostas
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Simular delay da consulta
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular resultados
    const resultadosSimulados: CCBResult[] = listaPropostas.map(proposta => ({
      numeroPropostaCompleto: proposta,
      ccbEncontrada: Math.random() > 0.3, // 70% de chance de encontrar
      dataInclusao: Math.random() > 0.3 ? 
        new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR') : 
        null
    }));

    setResultados(resultadosSimulados);
    setIsLoading(false);

    toast({
      title: "Consulta realizada",
      description: `${resultadosSimulados.length} propostas consultadas com sucesso.`,
    });
  };

  const handleDownloadCcb = (proposta: string) => {
    toast({
      title: "Download iniciado",
      description: `Fazendo download da CCB para a proposta ${proposta}`,
    });
    // Aqui seria implementado o download real
  };

  const handleDownloadTodas = () => {
    const ccbsDisponiveis = resultados.filter(r => r.ccbEncontrada);
    if (ccbsDisponiveis.length === 0) {
      toast({
        title: "Nenhuma CCB disponível",
        description: "Não há CCBs disponíveis para download.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Download iniciado",
      description: `Gerando arquivo ZIP com ${ccbsDisponiveis.length} CCBs...`,
    });
    // Aqui seria implementado o download do ZIP
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <GlobalHeader title="Consulta CCB" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consulta CCB</h1>
          <p className="text-muted-foreground">
            Consulte a disponibilidade de CCBs no SFTP
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Consultar CCBs
            </CardTitle>
            <CardDescription>
              Digite os números das propostas (uma por linha) para verificar a disponibilidade das CCBs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propostas">Números das Propostas</Label>
              <Textarea
                id="propostas"
                placeholder="Digite os números das propostas, uma por linha&#10;Exemplo:&#10;2024001234&#10;2024001235&#10;2024001236"
                value={propostas}
                onChange={(e) => setPropostas(e.target.value)}
                rows={8}
                className="font-mono"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleConsultar} 
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isLoading ? "Consultando..." : "Consultar"}
              </Button>
              
              {resultados.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={handleDownloadTodas}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Baixar tudo ({resultados.filter(r => r.ccbEncontrada).length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {resultados.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Consulta</CardTitle>
              <CardDescription>
                {resultados.length} propostas consultadas - {resultados.filter(r => r.ccbEncontrada).length} CCBs encontradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nro Proposta</TableHead>
                      <TableHead>CCB Encontrada</TableHead>
                      <TableHead>Data Inclusão</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultados.map((resultado) => (
                      <TableRow key={resultado.numeroPropostaCompleto}>
                        <TableCell className="font-medium">
                          {resultado.numeroPropostaCompleto}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            resultado.ccbEncontrada 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {resultado.ccbEncontrada ? 'Sim' : 'Não'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {resultado.dataInclusao || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {resultado.ccbEncontrada && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadCcb(resultado.numeroPropostaCompleto)}
                              className="flex items-center gap-1"
                            >
                              <FileDown className="h-3 w-3" />
                              Download
                            </Button>
                          )}
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
