import { useState } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface PropostaResult {
  numeroProposta: string;
  nomeCliente: string;
  status: string;
  dataSolicitacao: string;
}

export function CancelarPropostaContent() {
  const [numeroProposta, setNumeroProposta] = useState("");
  const [resultado, setResultado] = useState<PropostaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBuscarProposta = async () => {
    if (!numeroProposta.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira o número da proposta.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular busca da proposta
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simular resultado da busca
    const propostaEncontrada: PropostaResult = {
      numeroProposta: numeroProposta,
      nomeCliente: "Cliente Teste",
      status: "Ativo",
      dataSolicitacao: new Date().toLocaleDateString('pt-BR'),
    };

    setResultado(propostaEncontrada);
    setIsLoading(false);

    toast({
      title: "Proposta encontrada",
      description: `Proposta ${numeroProposta} encontrada com sucesso.`,
    });
  };

  const handleCancelarProposta = () => {
    toast({
      title: "Cancelamento solicitado",
      description: `Solicitação de cancelamento para a proposta ${numeroProposta} enviada.`,
    });
    // Aqui seria implementado o cancelamento real
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <GlobalHeader title="Cancelamento de Proposta" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cancelamento de Proposta</h1>
          <p className="text-muted-foreground">
            Solicite o cancelamento de uma proposta existente
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600 bg-blue-100 p-1 rounded-full ring-2 ring-blue-200" />
              Buscar Proposta
            </CardTitle>
            <CardDescription>
              Digite o número da proposta que deseja cancelar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="proposta">Número da Proposta</Label>
              <Input
                id="proposta"
                placeholder="Digite o número da proposta"
                value={numeroProposta}
                onChange={(e) => setNumeroProposta(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              onClick={handleBuscarProposta} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </CardContent>
        </Card>

        {resultado && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado da Busca</CardTitle>
              <CardDescription>
                Detalhes da proposta encontrada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número da Proposta</TableHead>
                      <TableHead>Nome do Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data da Solicitação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{resultado.numeroProposta}</TableCell>
                      <TableCell>{resultado.nomeCliente}</TableCell>
                      <TableCell>{resultado.status}</TableCell>
                      <TableCell>{resultado.dataSolicitacao}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Button 
                variant="destructive"
                onClick={handleCancelarProposta}
                className="mt-4"
              >
                Cancelar Proposta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
